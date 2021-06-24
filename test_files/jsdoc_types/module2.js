/**
 * @fileoverview added by tsickle
 * Generated from: test_files/jsdoc_types/module2.ts
 * @suppress {checkTypes,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.jsdoc_types.module2');
var module = module || { id: 'test_files/jsdoc_types/module2.ts' };
goog.require('tslib');
class ClassOne {
}
exports.ClassOne = ClassOne;
class ClassTwo {
}
exports.ClassTwo = ClassTwo;
/**
 * @record
 */
function Interface() { }
exports.Interface = Interface;
/* istanbul ignore if */
if (COMPILED) {
    /** @type {number} */
    Interface.prototype.x;
}
/**
 * @template T
 */
class ClassWithParams {
}
exports.ClassWithParams = ClassWithParams;
/** @typedef {number} */
exports.TypeAlias;
/** @typedef {!Array<?>} */
exports.TypeAliasWithParam;
/** @type {number} */
exports.value = 3;
