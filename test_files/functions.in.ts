function FunctionsTest1(a: any): string;
function FunctionsTest1(a: number): string {
  return "a";
}
function FunctionsTest2(a: number, b: number) {}
/** @ngInject */
function FunctionsTest3(a: number, b: number) {}

function Destructuring({a, b}: {a: number, b: number}) {}
function Destructuring2([a, b]: number[], [[c]]: string[][]) {}
