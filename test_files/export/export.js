/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
goog.module('test_files.export.export');
var module = module || { id: 'test_files/export/export.ts' };
module = module;
exports = {};
const tsickle_forward_declare_1 = goog.forwardDeclare("test_files.export.export_helper");
const tsickle_forward_declare_2 = goog.forwardDeclare("test_files.export.export_helper_2");
const tsickle_forward_declare_3 = goog.forwardDeclare("test_files.export.type_and_value");
const tsickle_forward_declare_4 = goog.forwardDeclare("test_files.export.export_helper_3");
goog.require('test_files.export.export_helper_3'); // force type-only module to be loaded
const export_helper_1 = goog.require('test_files.export.export_helper');
exports.export2 = export_helper_1.export2;
exports.export5 = export_helper_1.export5;
exports.export4 = export_helper_1.export4;
/** @typedef {!tsickle_forward_declare_1.Bar} */
exports.Bar; // re-export typedef
/** @typedef {!tsickle_forward_declare_1.TypeDef} */
exports.RenamedTypeDef; // re-export typedef
/** @typedef {!tsickle_forward_declare_1.TypeDef} */
exports.TypeDef; // re-export typedef
/** @typedef {!tsickle_forward_declare_1.Interface} */
exports.Interface; // re-export typedef
/** @typedef {!tsickle_forward_declare_1.DeclaredType} */
exports.DeclaredType; // re-export typedef
/** @typedef {!tsickle_forward_declare_1.DeclaredInterface} */
exports.DeclaredInterface; // re-export typedef
const export_helper_2_1 = goog.require('test_files.export.export_helper_2');
// These conflict with an export discovered via the above exports,
// so the above export's versions should not show up.
/** @type {string} */
exports.export1 = 'wins';
const export_helper_2 = export_helper_1;
exports.export3 = export_helper_2.export4;
/** @typedef {!tsickle_forward_declare_2.Interface} */
exports.RenamedInterface; // re-export typedef
// This local should be fine to export.
/** @type {number} */
exports.exportLocal = 3;
// The existence of a local should not prevent "export2" from making
// it to the exports list.  export2 should only show up once in the
// above two "export *" lines, though.
/** @type {number} */
let export2 = 3;
const type_and_value_1 = goog.require('test_files.export.type_and_value');
exports.TypeAndValue = type_and_value_1.TypeAndValue;
/**
 * @return {!tsickle_forward_declare_4.Foo}
 */
function createFoo() {
    return { fooStr: 'fooStr' };
}
exports.createFoo = createFoo;
/** @typedef {!tsickle_forward_declare_4.Foo} */
exports.Foo; // re-export typedef
