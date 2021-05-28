// test_files/functions/functions.ts(33,20): warning TS0: failed to resolve rest parameter type, emitting ?
// test_files/functions/functions.ts(35,1): warning TS0: unable to translate rest anonymous types
/**
 * @fileoverview added by tsickle
 * Generated from: test_files/functions/functions.ts
 * @suppress {checkTypes,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.functions.functions');
var module = module || { id: 'test_files/functions/functions.ts' };
goog.require('tslib');
/**
 * @param {number} a
 * @return {number}
 */
function Test1(a) {
    return a;
}
/**
 * @param {number} a
 * @param {number} b
 * @return {void}
 */
function Test2(a, b) { }
/**
 * @ngInject
 * @param {number} a
 * @param {number} b
 * @return {void}
 */
function Test3(a, b) { }
/**
 * @param {?} a
 * @return {string}
 */
function Test4(a) {
    return 'a';
}
// Test a "this" param and a rest param in the same function.
/**
 * @this {string}
 * @param {...?} params
 * @return {void}
 */
function TestThisAndRest(...params) { }
TestThisAndRest.call('foo', 'bar', 3);
/**
 * @param {{a: number, b: number}} __0
 * @return {void}
 */
function Destructuring({ a, b }) { }
/**
 * @param {!Array<number>} __0
 * @param {!Array<!Array<string>>} __1
 * @return {void}
 */
function Destructuring2([a, b], [[c]]) { }
/**
 * @param {!Array<?>} __0
 * @param {!Array<?>} __1
 * @return {void}
 */
function Destructuring3([a, b], [[c]]) { }
Destructuring({ a: 1, b: 2 });
Destructuring2([1, 2], [['a']]);
Destructuring3([1, 2], [['a']]);
/**
 * @param {...number} a
 * @return {void}
 */
function testRest(...a) { }
/**
 * @param {...number} a
 * @return {void}
 */
function testRest2(...a) { }
/**
 * @param {...?} a
 * @return {void}
 */
function testRest3(...a) { }
/**
 * @template T
 * @param {...number} a
 * @return {void}
 */
function testRest4(...a) { }
/**
 * @template T
 * @param {function(...number): void} f
 * @return {void}
 */
function testRest5(f) { }
/**
 * @param {...number} a
 * @return {void}
 */
function testRest6(...a) { }
/**
 * @param {...?} a
 * @return {void}
 */
function testRest7(...a) { }
/**
 * @param {...?} a
 * @return {void}
 */
function testRest8(...a) { }
/** @typedef {function(...?): void} */
var TestRest8Type;
testRest(1, 2);
testRest2(1, 2);
testRest3(1, 2);
testRest4(1, 2);
testRest5((/**
 * @param {number} x
 * @param {number} y
 * @return {void}
 */
(x, y) => { }));
testRest6(1, 2);
testRest7(1, 'a');
testRest8({ a: 1, b: 2 });
/**
 * @param {number=} x
 * @param {number=} y
 * @param {...?} z
 * @return {void}
 */
function defaultBeforeRequired(x = 1, y, ...z) { }
defaultBeforeRequired(undefined, 2, 'h', 3);
// The array reference below happens on the template parameter constraint, not on the parameter
// itself. Make sure tsickle unwraps the right type.
/**
 * @template T
 * @param {...string} str
 * @return {number}
 */
function templatedBoundRestArg(...str) {
    return str.length;
}
// But only do so if the parameter is not an array reference type by itself.
/**
 * @template T
 * @param {...T} str
 * @return {number}
 */
function templatedBoundRestArg2(...str) {
    return str.length;
}
// Also handle the case where it's both.
/**
 * @template T
 * @param {...T} str
 * @return {number}
 */
function templatedBoundRestArg3(...str) {
    return str.length;
}
/**
 * @template T
 * @param {T} t
 * @return {number}
 */
function templated(t) {
    return 1;
}
