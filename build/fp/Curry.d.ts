export declare const curry: <T1, T2>(fn: (t1: T1) => T2) => (t1: T1) => T2;
export declare const curry2: <T1, T2, T3>(fn: (t1: T1, t2: T2) => T3) => (t1: T1) => (t2: T2) => T3;
export declare const curry3: <T1, T2, T3, T4>(fn: (t1: T1, t2: T2, t3: T3) => T4) => (t1: T1) => (t2: T2) => (t3: T3) => T4;
export declare const curry4: <T1, T2, T3, T4, T5>(fn: (t1: T1, t2: T2, t3: T3, t4: T4) => T5) => (t1: T1) => (t2: T2) => (t3: T3) => (t4: T4) => T5;
export declare const curry5: <T1, T2, T3, T4, T5, T6>(fn: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => T6) => (t1: T1) => (t2: T2) => (t3: T3) => (t4: T4) => (t5: T5) => T6;
export declare const curry6: <T1, T2, T3, T4, T5, T6, T7>(fn: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => T7) => (t1: T1) => (t2: T2) => (t3: T3) => (t4: T4) => (t5: T5) => (t6: T6) => T7;
