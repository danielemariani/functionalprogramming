export declare abstract class Either<L, R> {
    static left<L>(l: L): Left<L>;
    static right<R>(r: R): Right<R>;
    abstract fold<B>(onLeft: (l: L) => B, onRight: (r: R) => B): B;
    abstract map<R2>(f: (v: R) => R2): Either<L, R2>;
    abstract flatMap<R2>(f: (v: R) => Either<L, R2>): Either<L, R2>;
}
export declare class Left<L> extends Either<L, never> {
    private readonly value;
    constructor(value: L);
    fold<B>(onLeft: (l: L) => B, onRight: (r: never) => B): B;
    map<R2>(f: (v: never) => R2): Either<L, R2>;
    flatMap<R2>(f: (v: never) => Either<L, R2>): Either<L, R2>;
}
export declare class Right<R> extends Either<never, R> {
    private readonly value;
    constructor(value: R);
    fold<B>(onLeft: (l: never) => B, onRight: (r: R) => B): B;
    map<R2>(f: (v: R) => R2): Either<never, R2>;
    flatMap<R2>(f: (v: R) => Either<never, R2>): Either<never, R2>;
}