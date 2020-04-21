export declare type Nullable<V> = V | null | undefined;
export declare const accumulate: <I, O>(f: (i: I) => O) => (i: I) => [I, O];
export declare const passThrough: <I>(f: (i: I) => void) => (i: I) => I;
export declare const executeAndThrow: <I>(f: (i: I) => void) => (i: I) => never;
export declare const isDefined: (x: any) => boolean;
