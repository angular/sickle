goog.module('test_files.typedef.typedef');var module = module || {id: 'test_files/typedef/typedef.js'};/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/** @typedef {number} */
var MyType;
var /** @type {number} */ y = 3;
/** @typedef {{value: number, next: ?}} */
var Recursive;
/** @typedef {(string|number)} */
var UnionTypeAlias;
const /** @type {UnionTypeAlias} */ unionUser = 1;
const /** @type {(UnionTypeAlias|boolean)} */ unionUserInUnion = false;
/** @typedef {{x: (UnionTypeAlias|boolean)}} */
var UnionTypeAliasUsingUnion;
/**
 * @param {(UnionTypeAlias|boolean)} x
 * @return {void}
 */
function paramUsingUnion(x) { }
/** @typedef {string} */
exports.ExportedType;
/**
 * @record
 * @template T, U
 */
function TypeWithGenericArgAndDefault() { }
function TypeWithGenericArgAndDefault_tsickle_Closure_declarations() {
}
/** @typedef {!TypeWithGenericArgAndDefault<number, UnionTypeAlias>} */
var TypeAliasWithDefaultArgs;
/**
 * @record
 * @template T
 */
function TypeWithGenericArg() { }
function TypeWithGenericArg_tsickle_Closure_declarations() {
}
/** @typedef {!TypeWithGenericArg<?>} */
var TypeAliasWithTypeArgs;
