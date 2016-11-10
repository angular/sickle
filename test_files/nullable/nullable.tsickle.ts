
class Primitives {
  nullable: string|null;
  undefinable: number|undefined;
  nullableUndefinable: string|null|undefined;
  optional?: string;
}

// tsickle -> Closure type declarations
 /** @type {(null|string)} */
Primitives.prototype.nullable;
 /** @type {(undefined|number)} */
Primitives.prototype.undefinable;
 /** @type {(undefined|null|string)} */
Primitives.prototype.nullableUndefinable;
 /** @type {(undefined|string)} */
Primitives.prototype.optional;


class NonPrimitive {}

class NonPrimitives {
  nonNull: NonPrimitive;
  nullable: NonPrimitive|null;
  undefinable: NonPrimitive|undefined;
  nullableUndefinable: NonPrimitive|null|undefined;
  optional?: NonPrimitive;
}

// tsickle -> Closure type declarations
 /** @type {NonPrimitive} */
NonPrimitives.prototype.nonNull;
 /** @type {(null|NonPrimitive)} */
NonPrimitives.prototype.nullable;
 /** @type {(undefined|NonPrimitive)} */
NonPrimitives.prototype.undefinable;
 /** @type {(undefined|null|NonPrimitive)} */
NonPrimitives.prototype.nullableUndefinable;
 /** @type {(undefined|NonPrimitive)} */
NonPrimitives.prototype.optional;

