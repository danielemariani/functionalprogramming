
export type Nullable<V> = V | null | undefined;

export const accumulate = <I, O>(f: (i: I) => O) =>
  (i: I): [I, O] => {
    const o = f(i);
    return [i, o];
  };

export const passThrough = <I>(f: (i: I) => void) =>
  (i: I): I => {
    f(i);
    return i;
  };

export const executeAndThrow = <I>(f: (i: I) => void) =>
  (i: I): never => {
    f(i);
    throw i;
  };

export const isDefined = (x: any) => x !== null && typeof x !== 'undefined';
