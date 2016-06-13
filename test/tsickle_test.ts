import {expect} from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import * as cli_support from '../src/cli_support';
import * as tsickle from '../src/tsickle';

import * as test_support from './test_support';

let RUN_TESTS_MATCHING: RegExp = null;
// RUN_TESTS_MATCHING = /fields/;

// If true, update all the golden .js files to be whatever tsickle
// produces from the .ts source. Do not change this code but run as:
//     UPDATE_GOLDENS=y gulp test
const UPDATE_GOLDENS = !!process.env.UPDATE_GOLDENS;

/**
 * compareAgainstGoldens compares a test output against the content in a golden
 * path, updating the content of the golden when UPDATE_GOLDENS is true.
 *
 * @param output The expected output, where the empty string indicates
 *    the file is expected to exist and be empty, while null indicates
 *    the file is expected to not exist.  (This subtlety is used for
 *    externs files, where the majority of tests are not expected to
 *    produce one.)
 */
function compareAgainstGolden(output: string, path: string) {
  let golden: string = null;
  try {
    golden = fs.readFileSync(path, 'utf-8');
  } catch (e) {
    if (e.code === 'ENOENT' && (UPDATE_GOLDENS || output === null)) {
      // A missing file is acceptable if we're updating goldens or
      // if we're expected to produce no output.
    } else {
      throw e;
    }
  }

  if (UPDATE_GOLDENS && output !== golden) {
    console.log('Updating golden file for', path);
    if (output !== null) {
      fs.writeFileSync(path, output, 'utf-8');
    } else {
      // The desired golden state is for there to be no output file.
      // Ensure no file exists.
      try {
        fs.unlinkSync(path);
      } catch (e) {
        // ignore.
      }
    }
  } else {
    expect(output).to.equal(golden);
  }
}

describe('golden tests', () => {
  test_support.goldenTests().forEach((test) => {
    if (RUN_TESTS_MATCHING && !RUN_TESTS_MATCHING.exec(test.name)) {
      it.skip(test.name);
      return;
    }
    let options: tsickle.Options = {};
    if (/\.untyped\b/.test(test.name)) {
      options.untyped = true;
    }
    it(test.name, () => {
      // Read all the inputs into a map, and create a ts.Program from them.
      let tsSources: {[fileName: string]: string} = {};
      for (let tsFile of test.tsFiles) {
        let tsPath = path.join(test.path, tsFile);
        let tsSource = fs.readFileSync(tsPath, 'utf-8');
        tsSources[tsPath] = tsSource;
      }
      let program = test_support.createProgram(tsSources);

      // Tsickle-annotate all the sources, comparing against goldens, and gather the
      // generated externs and tsickle-processed sources.
      let allExterns: string = null;
      let tsickleSources: {[fileName: string]: string} = {};
      for (let tsPath of Object.keys(tsSources)) {
        let warnings: ts.Diagnostic[] = [];
        options.logWarning = (diag: ts.Diagnostic) => { warnings.push(diag); };
        // Run TypeScript through tsickle and compare against goldens.
        let {output, externs, diagnostics} =
            tsickle.annotate(program, program.getSourceFile(tsPath), options);
        if (externs) allExterns = externs;

        // If there were any diagnostics, convert them into strings for
        // the golden output.
        let fileOutput = output;
        diagnostics.push(...warnings);
        if (diagnostics.length > 0) {
          // Munge the filenames in the diagnostics so that they don't include
          // the tsickle checkout path.
          for (let diag of diagnostics) {
            let fileName = diag.file.fileName;
            diag.file.fileName = fileName.substr(fileName.indexOf('test_files'));
          }
          fileOutput = tsickle.formatDiagnostics(diagnostics) + '\n====\n' + output;
        }
        let tsicklePath = tsPath.replace(/.ts(x)?$/, '.tsickle.ts$1');
        expect(tsicklePath).to.not.equal(tsPath);
        compareAgainstGolden(fileOutput, tsicklePath);
        tsickleSources[tsPath] = output;
      }
      compareAgainstGolden(allExterns, test.externsPath);

      // Run tsickled TypeScript through TypeScript compiler
      // and compare against goldens.
      program = test_support.createProgram(tsickleSources);
      let jsSources = test_support.emit(program);
      for (let jsPath of Object.keys(jsSources)) {
        compareAgainstGolden(jsSources[jsPath], jsPath);
      }
    });
  });
});

describe('getJSDocAnnotation', () => {
  it('does not get non-jsdoc values', () => {
    let source = '/* ordinary comment */';
    expect(tsickle.getJSDocAnnotation(source)).to.equal(null);
  });
  it('grabs plain text from jsdoc', () => {
    let source = '/** jsdoc comment */';
    expect(tsickle.getJSDocAnnotation(source)).to.deep.equal({tags: [{text: 'jsdoc comment'}]});
  });
  it('gathers @tags from jsdoc', () => {
    let source = `/**
  * @param foo
  * @param bar multiple
  *    line comment
  * @return foobar
  * @nosideeffects
  */`;
    expect(tsickle.getJSDocAnnotation(source)).to.deep.equal({
      tags: [
        {tagName: 'param', parameterName: 'foo'},
        {tagName: 'param', parameterName: 'bar', text: 'multiple line comment'},
        {tagName: 'return', text: 'foobar'},
        {tagName: 'nosideeffects'},
      ]
    });
  });
  it('rejects type annotations in parameters', () => {
    let source = `/**
  * @param {string} foo
*/`;
    expect(() => tsickle.getJSDocAnnotation(source)).to.throw(Error);
  });
  it('rejects @type annotations', () => {
    let source = `/** @type {string} foo */`;
    expect(() => tsickle.getJSDocAnnotation(source)).to.throw(Error);
  });
  it('allows @suppress annotations', () => {
    let source = `/** @suppress {checkTypes} I hate types */`;
    expect(tsickle.getJSDocAnnotation(source)).to.deep.equal({
      tags: [{tagName: 'suppress', text: '{checkTypes} I hate types'}]
    });
  });
});

describe('convertCommonJsToGoogModule', () => {
  function expectCommonJs(fileName: string, content: string, useDeclareLegacyNamespace = false) {
    return expect(
        tsickle
            .convertCommonJsToGoogModule(
                fileName, content, cli_support.pathToModuleName, useDeclareLegacyNamespace)
            .output);
  }

  it('adds a goog.module call', () => {
    // NB: no line break added below.
    expectCommonJs('a.js', `console.log('hello');`)
        .to.equal(`goog.module('a');var module = module || {id: 'a.js'};console.log('hello');`);
  });

  it('adds declareLegacyNamespace when specified', () => {
    expectCommonJs('a.js', `console.log('hello');`, true)
        .to.equal(
            `goog.module('a');goog.module.declareLegacyNamespace();var module = module || {id: 'a.js'};console.log('hello');`);
  });

  it('adds a goog.module call to empty files', () => {
    expectCommonJs('a.js', ``).to.equal(`goog.module('a');var module = module || {id: 'a.js'};`);
  });

  it('adds a goog.module call to empty-looking files', () => {
    expectCommonJs('a.js', `// empty`)
        .to.equal(`goog.module('a');var module = module || {id: 'a.js'};// empty`);
  });

  it('strips use strict directives', () => {
    // NB: no line break added below.
    expectCommonJs('a.js', `"use strict";
console.log('hello');`)
        .to.equal(`goog.module('a');var module = module || {id: 'a.js'};
console.log('hello');`);
  });

  it('converts require calls', () => {
    expectCommonJs('a.js', `var r = require('req/mod');`)
        .to.equal(
            `goog.module('a');var module = module || {id: 'a.js'};var r = goog.require('req.mod');`);
  });

  it('converts require calls without assignments on first line', () => {
    expectCommonJs('a.js', `require('req/mod');`)
        .to.equal(
            `goog.module('a');var module = module || {id: 'a.js'};var unused_0_ = goog.require('req.mod');`);
  });

  it('converts require calls without assignments on a new line', () => {
    expectCommonJs('a.js', `
require('req/mod');
require('other');`)
        .to.equal(`goog.module('a');var module = module || {id: 'a.js'};
var unused_0_ = goog.require('req.mod');
var unused_1_ = goog.require('other');`);
  });

  it('converts require calls without assignments after comments', () => {
    expectCommonJs('a.js', `
// Comment
require('req/mod');`)
        .to.equal(`goog.module('a');var module = module || {id: 'a.js'};
// Comment
var unused_0_ = goog.require('req.mod');`);
  });

  it('converts const require calls', () => {
    expectCommonJs('a.js', `const r = require('req/mod');`)
        .to.equal(
            `goog.module('a');var module = module || {id: 'a.js'};var r = goog.require('req.mod');`);
  });

  it('converts export * statements', () => {
    expectCommonJs('a.js', `__export(require('req/mod'));`)
        .to.equal(
            `goog.module('a');var module = module || {id: 'a.js'};__export(goog.require('req.mod'));`);
  });

  it('resolves relative module URIs', () => {
    // See below for more fine-grained unit tests.
    expectCommonJs('a/b.js', `var r = require('./req/mod');`)
        .to.equal(
            `goog.module('a.b');var module = module || {id: 'a/b.js'};var r = goog.require('a.req.mod');`);
  });

  it('avoids mangling module names in goog: imports', () => {
    expectCommonJs('a/b.js', `
var goog_use_Foo_1 = require('goog:foo_bar.baz');`)
        .to.equal(`goog.module('a.b');var module = module || {id: 'a/b.js'};
var goog_use_Foo_1 = goog.require('foo_bar.baz');`);
  });

  it('resolves default goog: module imports', () => {
    expectCommonJs('a/b.js', `
var goog_use_Foo_1 = require('goog:use.Foo');
console.log(goog_use_Foo_1.default);`)
        .to.equal(`goog.module('a.b');var module = module || {id: 'a/b.js'};
var goog_use_Foo_1 = goog.require('use.Foo');
console.log(goog_use_Foo_1        );`);
    // NB: the whitespace above matches the .default part, so that
    // source maps are not impacted.
  });

  it('leaves single .default accesses alone', () => {
    // This is a repro for a bug when no goog: symbols are found.
    expectCommonJs('a/b.js', `
console.log(this.default);
console.log(foo.bar.default);`)
        .to.equal(`goog.module('a.b');var module = module || {id: 'a/b.js'};
console.log(this.default);
console.log(foo.bar.default);`);
  });

  it('inserts the module after "use strict"', () => {
    expectCommonJs('a/b.js', `/**
* docstring here
*/
"use strict";
var foo = bar;
`).to.equal(`goog.module('a.b');var module = module || {id: 'a/b.js'};/**
* docstring here
*/

var foo = bar;
`);
  });

  it('deduplicates module imports', () => {
    expectCommonJs('a/b.js', `var foo_1 = require('goog:foo');
var foo_2 = require('goog:foo');
foo_1.A, foo_2.B, foo_2.default, foo_3.default;
`).to.equal(`goog.module('a.b');var module = module || {id: 'a/b.js'};var foo_1 = goog.require('foo');
var foo_2 = foo_1;
foo_1.A, foo_2.B, foo_2        , foo_3.default;
`);
  });

  it('gathers referenced modules', () => {
    let {referencedModules} = tsickle.convertCommonJsToGoogModule(
        'a/b', `
require('../foo/bare-require');
var googRequire = require('goog:foo.bar');
var es6RelativeRequire = require('./relative');
var es6NonRelativeRequire = require('non/relative');
__export(require('./export-star');
`,
        cli_support.pathToModuleName);

    return expect(referencedModules).to.deep.equal([
      'foo.bare-require',
      'foo.bar',
      'a.relative',
      'non.relative',
      'a.export-star',
    ]);
  });
});
