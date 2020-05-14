import { Either } from './Either';
import { AsyncTask } from './AsyncTask';
declare type ValueOrPromiseOf<A> = A | Promise<A>;
export declare class AsyncTaskEither<L, R> {
    private readonly task;
    static right<R>(r: R): AsyncTaskEither<never, R>;
    static left<L>(l: L): AsyncTaskEither<L, never>;
    constructor(task: () => ValueOrPromiseOf<Either<L, R>>);
    map<R2>(f: (r: R) => R2): AsyncTaskEither<L, R2>;
    mapLeft<L2>(f: (l: L) => L2): AsyncTaskEither<L2, R>;
    flatMap<R2>(f: (r: R) => AsyncTaskEither<L, R2>): AsyncTaskEither<L, R2>;
    flatMapLeft<L2>(f: (l: L) => AsyncTaskEither<L2, R>): AsyncTaskEither<L2, R>;
    toAsyncTask(): AsyncTask<R>;
    execute(): Promise<Either<L, R>>;
}
export {};
