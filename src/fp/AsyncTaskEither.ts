import { Either } from './Either';
import { AsyncTask } from './AsyncTask';

type ValueOrPromiseOf<A> = A | Promise<A>;

export class AsyncTaskEither<L, R> {
  private readonly task: () => ValueOrPromiseOf<Either<L, R>>;

  static right<R>(r: R): AsyncTaskEither<never, R> {
    return new AsyncTaskEither<never, R>(() => Either.right(r));
  }

  static left<L>(l: L): AsyncTaskEither<L, never> {
    return new AsyncTaskEither<L, never>(() => Either.left(l));
  }

  static wrap<L, R>(p: () => Promise<R>, handleError: (e: Error) => L): AsyncTaskEither<L, R> {
    return new AsyncTaskEither(async () => {
      try {
        const result = await p();
        return Either.right(result);
      } catch (e) {
        return Either.left(handleError(e));
      }
    });
  }

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

  mapLeft<L2>(f: (l: L) => L2): AsyncTaskEither<L2, R> {
    return new AsyncTaskEither<L2, R>(
      () => this.execute()
        .then(r => r.fold<Either<L2, R>>(
          (l) => Either.left(f(l)),
          (r) => Either.right(r),
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

  flatMapLeft<L2>(f: (l: L) => AsyncTaskEither<L2, R>): AsyncTaskEither<L2, R> {
    return new AsyncTaskEither<L2, R>(
      () => this.execute()
        .then(r => r.fold<AsyncTaskEither<L2, R>>(
          (l) => f(l),
          (r) => new AsyncTaskEither<L2, R>(() => Either.right(r)),
        ).execute())
    );
  }

  handleExceptions(handle: (e: Error) => L): AsyncTaskEither<L, R> {
    return new AsyncTaskEither<L, R>(
      () => this.execute().catch(e => Either.left(handle(e)))
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
