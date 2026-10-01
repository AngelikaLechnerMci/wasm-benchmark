import createModule from '../web/bench.mjs';

const wasm = await createModule();
console.log('fib(10)         =', wasm._fib(10));
console.log('count_primes(100) =', wasm._count_primes(100));
console.log('bubble_sort(100)  =', wasm._bubble_sort(100, 42));