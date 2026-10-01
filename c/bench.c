#include <stdlib.h>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

static unsigned int next_rand(unsigned int *s) {
    *s = *s * 1664525u + 1013904223u;
    return *s;
}

// 1) Bubble Sort: O(n^2), klassischer Rechentest
EMSCRIPTEN_KEEPALIVE
int bubble_sort(int n, unsigned int seed) {
    int *a = malloc(n * sizeof(int));
    unsigned int s = seed;
    for (int i = 0; i < n; i++) a[i] = next_rand(&s) % 100000;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
            }
        }
    }
    int result = a[0] + a[n / 2] + a[n - 1];   // Checksumme zur Kontrolle
    free(a);
    return result;
}

// 2) Fibonacci rekursiv: viele Funktionsaufrufe
EMSCRIPTEN_KEEPALIVE
int fib(int n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

// 3) Primzahlen zählen (Trial Division)
EMSCRIPTEN_KEEPALIVE
int count_primes(int limit) {
    int count = 0;
    for (int i = 2; i < limit; i++) {
        int prime = 1;
        for (int j = 2; j * j <= i; j++) {
            if (i % j == 0) { prime = 0; break; }
        }
        count += prime;
    }
    return count;
}