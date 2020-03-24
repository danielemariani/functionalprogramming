
export abstract class Optional<A> {

  static some<A>(value: A): Some<A> {
    return new Some(value);
  }

  static none<A>(): None<A> {
    return new None();
  }

  static fromOptionalValue<A>(a?: A): Optional<A> {
    return (typeof a === 'undefined' || a === null)
      ? Optional.none()
      : Optional.some(a);
  }

  abstract getOrElse(or: A): A

  abstract map<B>(f: (a: A) => B): Optional<B>

  abstract flatMap<B>(f: (a: A) => Optional<B>): Optional<B>
}

export class Some<A> extends Optional<A> {
  constructor(private readonly value: A) { super(); }

  getOrElse(or: A): A {
    return this.value;
  }

  map<B>(f: (a: A) => B): Optional<B> {
    return new Some<B>(f(this.value));
  }

  flatMap<B>(f: (a: A) => Optional<B>): Optional<B> {
    return f(this.value);
  }
}

export class None<A> extends Optional<A> {

  getOrElse(or: A): A {
    return or;
  }

  map<B>(f: (a: A) => B): Optional<B> {
    return new None();
  }

  flatMap<B>(f: (a: A) => Optional<B>): Optional<B> {
    return new None();
  }
}
