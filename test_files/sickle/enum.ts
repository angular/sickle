/** @typedef {number} */
enum EnumTest1 {XYZ, PI = 3.14159}
/** @type {EnumTest1} */
(<any>EnumTest1).XYZ = 0;
/** @type {EnumTest1} */
(<any>EnumTest1).PI =  3.14159;
/** @typedef {number} */

export enum EnumTest2 {XYZ, PI = 3.14159}
/** @type {EnumTest2} */
(<any>EnumTest2).XYZ = 0;
/** @type {EnumTest2} */
(<any>EnumTest2).PI =  3.14159;

