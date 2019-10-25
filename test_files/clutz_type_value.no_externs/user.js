/**
 *
 * @fileoverview This test verifies that a type/value-conflict symbol that
 * occurs in a clutz file still can be used in a heritage clause.
 *
 * Generated from: test_files/clutz_type_value.no_externs/user.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.clutz_type_value.no_externs.user');
var module = module || { id: 'test_files/clutz_type_value.no_externs/user.ts' };
module = module;
exports = {};
const tsickle_goog_type_value_1 = goog.requireType("type_value");
// We expect IFace to show up in the @implements tag.
/**
 * @implements {tsickle_goog_type_value_1}
 */
class C {
    constructor() {
        this.field = 'abc';
    }
}
if (false) {
    /** @type {string} */
    C.prototype.field;
}
