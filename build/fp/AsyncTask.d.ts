declare type ValueOrPromiseOf<A> = A | Promise<A>;
export declare class AsyncTask<A> {
    private readonly task;
    constructor(task: () => ValueOrPromiseOf<A>);
    map<B>(f: (a: A) => ValueOrPromiseOf<B>): AsyncTask<B>;
    flatMap<B>(f: (a: A) => AsyncTask<B>): AsyncTask<B>;
    execute(): Promise<A>;
}
export {};
