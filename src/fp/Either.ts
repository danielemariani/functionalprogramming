
export abstract class Either<L, R> {

  static left<L>(l: L): Left<L> {
    return new Left(l);
  }

  static right<R>(r: R): Right<R> {
    return new Right(r);
  }

  abstract fold<B>(onLeft: (l: L) => B, onRight: (r: R) => B): B

  abstract map<R2>(f: (v: R) => R2): Either<L, R2>

  abstract leftMap<L2>(f: (v: L) => L2): Either<L2, R>

  abstract flatMap<R2>(f: (v: R) => Either<L, R2>): Either<L, R2>
}

export class Left<L> extends Either<L, never> {

  constructor(private readonly value: L) {
    super();
  }

  fold<B>(onLeft: (l: L) => B, onRight: (r: never) => B): B {
    return onLeft(this.value);
  }

  map<R2>(f: (v: never) => R2): Either<L, R2> {
    return Either.left(this.value);
  }

  leftMap<L2>(f: (v: L) => L2): Either<L2, never> {
    return Either.left(f(this.value));
  }

  flatMap<R2>(f: (v: never) => Either<L, R2>): Either<L, R2> {
    return Either.left(this.value);
  }
}

export class Right<R> extends Either<never, R> {

  constructor(private readonly value: R) {
    super();
  }

  fold<B>(onLeft: (l: never) => B, onRight: (r: R) => B): B {
    return onRight(this.value);
  }

  map<R2>(f: (v: R) => R2): Either<never, R2> {
    return Either.right(f(this.value));
  }

  leftMap<L2>(f: (v: never) => L2): Either<never, R> {
    return Either.right(this.value);
  }

  flatMap<R2>(f: (v: R) => Either<never, R2>): Either<never, R2> {
    return f(this.value);
  }
}
