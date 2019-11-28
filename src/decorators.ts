/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {getAllLeadingComments} from './transformer_util';

/**
 * Returns the declarations for the given decorator.
 */
export function getDecoratorDeclarations(
    decorator: ts.Decorator, typeChecker: ts.TypeChecker): ts.Declaration[] {
  // Walk down the expression to find the identifier of the decorator function.
  let node: ts.Node = decorator;
  while (node.kind !== ts.SyntaxKind.Identifier) {
    if (node.kind === ts.SyntaxKind.Decorator || node.kind === ts.SyntaxKind.CallExpression) {
      node = (node as ts.Decorator | ts.CallExpression).expression;
    } else {
      // We do not know how to handle this type of decorator.
      return [];
    }
  }

  let decSym = typeChecker.getSymbolAtLocation(node);
  if (!decSym) return [];
  if (decSym.flags & ts.SymbolFlags.Alias) {
    decSym = typeChecker.getAliasedSymbol(decSym);
  }
  return decSym.getDeclarations() || [];
}

/**
 * Returns true if node has an exporting decorator  (i.e., a decorator with @ExportDecoratedItems
 * in its JSDoc).
 */
export function hasExportingDecorator(node: ts.Node, typeChecker: ts.TypeChecker) {
  return node.decorators &&
      node.decorators.some(
          decorator => hasDocsMatching(decorator, /@ExportDecoratedItems\b/, typeChecker));
}

/**
 * Returns true if the given decorator has a comment whose text matches the
 * given regex.
 */
function hasDocsMatching(decorator: ts.Decorator, regex: RegExp, typeChecker: ts.TypeChecker) {
  return getDecoratorDeclarations(decorator, typeChecker).some(declaration => {
    const range = getAllLeadingComments(declaration);
    if (!range) {
      return false;
    }
    for (const {text} of range) {
      if (regex.test(text)) {
        return true;
      }
    }
    return false;
  });
}
