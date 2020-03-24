import { Either } from './Either';
import { AsyncTask } from './AsyncTask';
declare type ValueOrPromiseOf<A> = A | Promise<A>;
export declare class AsyncTaskEither<L, R> {
    private readonly task;
    constructor(task: () => ValueOrPromiseOf<Either<L, R>>);
    map<R2>(f: (r: R) => R2): AsyncTaskEither<L, R2>;
    flatMap<R2>(f: (r: R) => AsyncTaskEither<L, R2>): AsyncTaskEither<L, R2>;
    toAsyncTask(): AsyncTask<R>;
    execute(): Promise<Either<L, R>>;
}
export {};
