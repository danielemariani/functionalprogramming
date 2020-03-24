
export const compose: <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => C = <A, B, C>(f, g) => (a) => f(g(a));
