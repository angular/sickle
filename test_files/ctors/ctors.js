/**
 * @fileoverview added by tsickle
 * Generated from: test_files/ctors/ctors.ts
 * @suppress {checkTypes,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.ctors.ctors');
var module = module || { id: 'test_files/ctors/ctors.ts' };
goog.require('tslib');
/** @type {function(new:Document)} */
let x = Document;
class X {
    /**
     * @param {number} a
     */
    constructor(a) {
        this.a = a;
    }
}
/* istanbul ignore if */
if (COMPILED) {
    /**
     * @type {number}
     * @private
     */
    X.prototype.a;
}
/** @type {function(new:X, number)} */
let y = X;
class OverloadedCtor {
    /**
     * @param {(string|number)} a
     */
    constructor(a) {
        this.a = a;
    }
}
/* istanbul ignore if */
if (COMPILED) {
    /**
     * @type {(string|number)}
     * @private
     */
    OverloadedCtor.prototype.a;
}
