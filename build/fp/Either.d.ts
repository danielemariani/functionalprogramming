import { AsyncTaskEither } from './AsyncTaskEither';
export declare abstract class Either<L, R> {
    static left<L>(l: L): Left<L>;
    static right<R>(r: R): Right<R>;
    abstract fold<B>(onLeft: (l: L) => B, onRight: (r: R) => B): B;
    abstract map<R2>(f: (v: R) => R2): Either<L, R2>;
    abstract leftMap<L2>(f: (v: L) => L2): Either<L2, R>;
    abstract flatMap<R2>(f: (v: R) => Either<L, R2>): Either<L, R2>;
    abstract toAsyncTaskEither(): AsyncTaskEither<L, R>;
}
export declare class Left<L> extends Either<L, never> {
    private readonly value;
    constructor(value: L);
    fold<B>(onLeft: (l: L) => B, onRight: (r: never) => B): B;
    map<R2>(f: (v: never) => R2): Either<L, R2>;
    leftMap<L2>(f: (v: L) => L2): Either<L2, never>;
    flatMap<R2>(f: (v: never) => Either<L, R2>): Either<L, R2>;
    toAsyncTaskEither(): AsyncTaskEither<L, never>;
}
export declare class Right<R> extends Either<never, R> {
    private readonly value;
    constructor(value: R);
    fold<B>(onLeft: (l: never) => B, onRight: (r: R) => B): B;
    map<R2>(f: (v: R) => R2): Either<never, R2>;
    leftMap<L2>(f: (v: never) => L2): Either<never, R>;
    flatMap<R2>(f: (v: R) => Either<never, R2>): Either<never, R2>;
    toAsyncTaskEither(): AsyncTaskEither<never, R>;
}
