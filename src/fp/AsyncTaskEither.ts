import { Either } from './Either';
import { AsyncTask } from './AsyncTask';

type ValueOrPromiseOf<A> = A | Promise<A>;

export class AsyncTaskEither<L, R> {
  private readonly task: () => ValueOrPromiseOf<Either<L, R>>;

  constructor(task: () => ValueOrPromiseOf<Either<L, R>>) {
    this.task = task;
  }

  map<R2>(f: (r: R) => R2): AsyncTaskEither<L, R2> {
    return new AsyncTaskEither<L, R2>(
      () => this.execute()
        .then(r => r.fold<Either<L, R2>>(
          (l) => Either.left(l),
          (r) => Either.right(f(r)),
        )));
  }

  flatMap<R2>(f: (r: R) => AsyncTaskEither<L, R2>): AsyncTaskEither<L, R2> {
    return new AsyncTaskEither<L, R2>(
      () => this.execute()
        .then(r => r.fold<AsyncTaskEither<L, R2>>(
          (l) => new AsyncTaskEither<L, R2>(() => Either.left(l)),
          (r) => f(r),
        ).execute())
    );
  }

  toAsyncTask(): AsyncTask<R> {
    return new AsyncTask<R>(() => this.execute()
      .then(either => either.fold<R>(
        (l) => { throw l; },
        (r) => { return r; },
      ))
    );
  }

  async execute(): Promise<Either<L, R>> {
    return this.task();
  }
}
