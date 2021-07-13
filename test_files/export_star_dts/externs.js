/**
 * @externs
 * @suppress {checkTypes,const,duplicate,missingOverride}
 */
// NOTE: generated by tsickle, do not edit.
// Generated from: test_files/export_star_dts/1_reexport_nested.d.ts
/** @const */
var test_files$export_star_dts$1_reexport_nested = {};
/**
 * @record
 * @struct
 */
test_files$export_star_dts$1_reexport_nested.namedExportBehindSeveralExportStars = function() {};
/** @type {?} */
test_files$export_star_dts$1_reexport_nested.namedExportBehindSeveralExportStars.prototype.prop1;
/** @type {?} */
test_files$export_star_dts$1_reexport_nested.namedExportBehindSeveralExportStars.prototype.prop2;
// Generated from: test_files/export_star_dts/2_reexport_nested.d.ts
/** @const */
var test_files$export_star_dts$2_reexport_nested_ = {};
// export * from './1_reexport_nested'
/** @const {(typeof test_files$export_star_dts$1_reexport_nested|typeof test_files$export_star_dts$2_reexport_nested_)} */
var test_files$export_star_dts$2_reexport_nested;
// Generated from: test_files/export_star_dts/3_reexport_nested.d.ts
/** @const */
var test_files$export_star_dts$3_reexport_nested_ = {};
// export * from './2_reexport_nested'
/** @const {(typeof test_files$export_star_dts$2_reexport_nested|typeof test_files$export_star_dts$3_reexport_nested_)} */
var test_files$export_star_dts$3_reexport_nested;
// Generated from: test_files/export_star_dts/declare_export_star.d.ts
/** @const */
var test_files$export_star_dts$declare_export_star_ = {};

/**
 * @param {!test_files$export_star_dts$1_reexport_nested.namedExportBehindSeveralExportStars} param
 * @return {void}
 */
test_files$export_star_dts$declare_export_star_.usesNamedExportFollowedByReexportsAsParamType = function(param) {};
/**
 * @implements {test_files$export_star_dts$1_reexport_nested.namedExportBehindSeveralExportStars}
 * @constructor
 * @struct
 */
test_files$export_star_dts$declare_export_star_.AClass = function() {};
/** @type {string} */
test_files$export_star_dts$declare_export_star_.AClass.prototype.prop1;
/** @type {number} */
test_files$export_star_dts$declare_export_star_.AClass.prototype.prop2;
/**
 * @record
 * @struct
 */
test_files$export_star_dts$declare_export_star_.OwnInterface = function() {};
// export * from './reexport_ambient'
// export * from './reexport_nonambient'
/** @const {(typeof test_files$export_star_dts$reexport_nonambient|typeof test_files$export_star_dts$reexport_ambient|typeof test_files$export_star_dts$declare_export_star_)} */
var test_files$export_star_dts$declare_export_star;
// Generated from: test_files/export_star_dts/reexport_ambient.d.ts
/** @const */
var test_files$export_star_dts$reexport_ambient = {};
/**
 * @record
 * @struct
 */
test_files$export_star_dts$reexport_ambient.InterfaceUsedByReexportedInDts = function() {};
/** @type {string} */
test_files$export_star_dts$reexport_ambient.InterfaceUsedByReexportedInDts.prototype.property;
/**
 * @record
 * @struct
 */
test_files$export_star_dts$reexport_ambient.InternalInterface = function() {};
/** @type {!test_files$export_star_dts$reexport_ambient.InterfaceUsedByReexportedInDts} */
test_files$export_star_dts$reexport_ambient.InternalInterface.prototype.nestedInterface;
/** @type {!test_files$export_star_dts$reexport_ambient.InternalInterface} */
test_files$export_star_dts$reexport_ambient.reexportedInDts;
// Generated from: test_files/export_star_dts/reexport_nonambient.ts
/** @const */
var test_files$export_star_dts$reexport_nonambient = {};
/** @type {number} */
test_files$export_star_dts$reexport_nonambient.rexportedFromNonDts;
