function nextRand(state) {
  // Math.imul + >>> 0 simuliert 32-Bit unsigned Arithmetik wie in C
  state.s = (Math.imul(state.s, 1664525) + 1013904223) >>> 0;
  return state.s;
}

export function bubbleSort(n, seed) {
  const a = new Int32Array(n);
  const state = { s: seed >>> 0 };
  for (let i = 0; i < n; i++) a[i] = nextRand(state) % 100000;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
      }
    }
  }
  return a[0] + a[Math.floor(n / 2)] + a[n - 1];
}

export function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

export function countPrimes(limit) {
  let count = 0;
  for (let i = 2; i < limit; i++) {
    let prime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { prime = false; break; }
    }
    if (prime) count++;
  }
  return count;
}