/**
 * @fileoverview added by tsickle
 * Generated from: test_files/basic.untyped/basic.untyped.ts
 * @suppress {checkTypes,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.basic.untyped.basic.untyped');
var module = module || { id: 'test_files/basic.untyped/basic.untyped.ts' };
goog.require('tslib');
// This test is just a random collection of typed code, to
// ensure the output is all with {?} annotations.
/**
 * @param {?} arg1
 * @return {?}
 */
function func(arg1) {
    return [3];
}
class Foo {
    /**
     * @param {?} ctorArg
     */
    constructor(ctorArg) {
        this.ctorArg = ctorArg;
        this.field = 'hello';
    }
}
/* istanbul ignore if */
if (COMPILED) {
    /** @type {?} */
    Foo.prototype.field;
    /**
     * @type {?}
     * @private
     */
    Foo.prototype.ctorArg;
}
// These two declarations should not have a @type annotation,
// regardless of untyped.
((/**
 * @return {?}
 */
function () {
    // With a type annotation:
    let { a, b } = { a: '', b: 0 };
}))();
((/**
 * @return {?}
 */
function () {
    // Without a type annotation:
    let { a, b } = { a: null, b: null };
}))();
