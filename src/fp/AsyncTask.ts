
type ValueOrPromiseOf<A> = A | Promise<A>;

export class AsyncTask<A> {
  private readonly task: () => ValueOrPromiseOf<A>;

  constructor(task: () => ValueOrPromiseOf<A>) {
    this.task = task;
  }

  map<B>(f: (a: A) => ValueOrPromiseOf<B>): AsyncTask<B> {
    return new AsyncTask(() => this.execute().then(t => f(t)));
  }

  flatMap<B>(f: (a: A) => AsyncTask<B>): AsyncTask<B> {
    return new AsyncTask(() => this.execute().then(t => f(t).execute()));
  }

  async execute(): Promise<A> {
    return this.task();
  }
}
