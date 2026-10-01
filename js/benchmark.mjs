import createModule from '../web/bench.mjs';
import { bubbleSort, fib, countPrimes } from './bench.js';

const wasm = await createModule();

function measure(fn, runs = 3) {
  let result;
  const times = [];
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now();
    result = fn();
    times.push(performance.now() - t0);
  }
  return { result, best: Math.min(...times) };
}

const tests = [
  { name: 'bubble_sort(30000)', js: () => bubbleSort(30000, 42), wasm: () => wasm._bubble_sort(30000, 42) },
  { name: 'fib(40)',            js: () => fib(40),              wasm: () => wasm._fib(40) },
  { name: 'count_primes(5e6)',  js: () => countPrimes(5000000), wasm: () => wasm._count_primes(5000000) },
];

console.log('Test'.padEnd(22), 'JS (ms)'.padStart(10), 'Wasm (ms)'.padStart(10), 'Speedup'.padStart(9), ' Ergebnis gleich?');
for (const t of tests) {
  const j = measure(t.js);
  const w = measure(t.wasm);
  const speedup = (j.best / w.best).toFixed(2) + 'x';
  console.log(
    t.name.padEnd(22),
    j.best.toFixed(1).padStart(10),
    w.best.toFixed(1).padStart(10),
    speedup.padStart(9),
    ' ', j.result === w.result ? 'ja' : `NEIN (JS ${j.result}, Wasm ${w.result})`
  );
}