// Samuel Rios - 2230205


let arr1 = [10, 20, 30];
arr1.push(40, 50);
console.log('push():', arr1);

let arr2 = [100, 200, 300, 400];
let ultimoElemento = arr2.pop();
console.log('pop():', arr2, 'Eliminado:', ultimoElemento);

let arr3 = [7, 8, 9, 10];
let primerElemento = arr3.shift();
console.log('shift():', arr3, 'Eliminado:', primerElemento);

let arr4 = [15, 25, 35];
arr4.unshift(5, 10);
console.log('unshift():', arr4);

let arr5 = [50, 60, 70, 80, 90];
arr5.splice(1, 2, 'X', 'Y');
console.log('splice():', arr5);

let arr6 = [9, 8, 7, 6];
arr6.reverse();
console.log('reverse():', arr6);

let arr7 = [12, 5, 8, 1, 19];
arr7.sort((a, b) => b - a);
console.log('sort():', arr7);

let arr8 = [3, 6, 9, 12];
arr8.fill(99, 2, 4);
console.log('fill():', arr8);

let arr9 = [11, 22, 33, 44, 55];
arr9.copyWithin(1, 3);
console.log('copyWithin():', arr9);

let arr10 = ['A', 'B'];
let arr11 = ['C', 'D'];
let resultado1 = arr10.concat(arr11, ['E', 'F']);
console.log('concat():', resultado1);

let arr12 = [100, 200, 300, 400, 500];
let resultado2 = arr12.slice(2, 4);
console.log('slice():', resultado2);

let arr13 = ['JavaScript', 'es', 'genial'];
let resultado3 = arr13.join(' - ');
console.log('join():', resultado3);

let arr14 = [42, 43, 44];
console.log('toString():', arr14.toString());

let arr15 = [5, 10, 15, 20, 15];
console.log('indexOf():', arr15.indexOf(15));

let arr16 = [5, 10, 15, 20, 15];
console.log('lastIndexOf():', arr16.lastIndexOf(15));

let arr17 = [1, 3, 5, 7];
console.log('includes():', arr17.includes(5));

let arr18 = [2, 4, 6];
console.log('forEach():');
arr18.forEach((elemento, indice) => {
    console.log(`  Índice ${indice}: ${elemento}`);
});

let arr19 = [3, 6, 9];
let resultado4 = arr19.map(x => x + 1);
console.log('map():', resultado4);

let arr20 = [10, 15, 20, 25];
let resultado5 = arr20.filter(x => x > 15);
console.log('filter():', resultado5);

let arr21 = [2, 4, 6, 8];
let resultado6 = arr21.find(x => x > 5);
console.log('find():', resultado6);

let arr22 = [10, 20, 30, 40];
let resultado7 = arr22.findIndex(x => x === 30);
console.log('findIndex():', resultado7);

let arr23 = [1, 2, 3, 4, 5];
let resultado8 = arr23.findLast ? arr23.findLast(x => x < 4) : 'No soportado';
console.log('findLast():', resultado8);

let arr24 = [1, 2, 3, 4, 5];
let resultado9 = arr24.findLastIndex ? arr24.findLastIndex(x => x < 4) : 'No soportado';
console.log('findLastIndex():', resultado9);

let arr25 = [5, 10, 15, 20];
let resultado10 = arr25.reduce((acumulador, actual) => acumulador * actual, 1);
console.log('reduce():', resultado10);

let arr26 = [8, 4, 2];
let resultado11 = arr26.reduceRight((acumulador, actual) => acumulador - actual, 20);
console.log('reduceRight():', resultado11);

let arr27 = [1, 3, 5, 7];
let resultado12 = arr27.some(x => x % 2 === 0);
console.log('some():', resultado12);

let arr28 = [2, 4, 6, 8];
let resultado13 = arr28.every(x => x % 2 === 0);
console.log('every():', resultado13);

console.log('Array.isArray():', Array.isArray([10, 20, 30]));
console.log('Array.isArray():', Array.isArray('texto'));

let resultado14 = Array.from('Array');
console.log('Array.from():', resultado14);

let resultado15 = Array.of(7, 14, 21);
console.log('Array.of():', resultado15);

let arr29 = [1, [2, 3], [4, [5, 6, [7]]]];
let resultado16 = arr29.flat(3);
console.log('flat():', resultado16);

let arr30 = [2, 4, 6];
let resultado17 = arr30.flatMap(x => [x, x / 2]);
console.log('flatMap():', resultado17);

let arr31 = [10, 20, 30, 40];
console.log('at():', arr31.at ? arr31.at(-2) : 'No soportado');

let arr32 = [1, 2, 3, 4, 5];
console.log('length:', arr32.length);

let arr33 = ['x', 'y', 'z'];
console.log('keys():', [...arr33.keys()]);

let arr34 = ['x', 'y', 'z'];
console.log('values():', [...arr34.values()]);

let arr35 = ['x', 'y', 'z'];
console.log('entries():');
for (let [indice, valor] of arr35.entries()) {
    console.log(`  ${indice}: ${valor}`);
}

console.log('\n EJEMPLOS \n');

let numeros = [10, 20, 30, 40, 50];
let suma = numeros.reduce((a, b) => a + b, 0);
console.log('Suma total:', suma);

let valores = [15, 3, 27, 9, 18];
let maximo = Math.max(...valores);
let minimo = Math.min(...valores);
console.log('Máximo:', maximo, 'Mínimo:', minimo);

let rango = Array.from({ length: 10 }, (_, i) => i * 2);
console.log('Rango:', rango);

let arrMezclar = [1, 2, 3, 4, 5];
let mezclado = [...arrMezclar].sort(() => Math.random() - 0.5);
console.log('Mezclado:', mezclado);

function dividirEnChunks(array, tamaño) {
    const chunks = [];
    for (let i = 0; i < array.length; i += tamaño) {
        chunks.push(array.slice(i, i + tamaño));
    }
    return chunks;
}
let arrChunks = [1, 2, 3, 4, 5, 6, 7, 8];
console.log('Chunks:', dividirEnChunks(arrChunks, 4));

console.log('\n= FIN DEL ARCHIVO =');