
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

  abstract isDefined(): boolean

  abstract isEmpty(): boolean

  abstract orElse(or: Optional<A>): Optional<A>

  abstract get(): A

  abstract getOrElse(or: A): A

  abstract map<B>(f: (a: A) => B): Optional<B>

  abstract flatMap<B>(f: (a: A) => Optional<B>): Optional<B>
}

export class Some<A> extends Optional<A> {
  constructor(private readonly value: A) { super(); }

  isDefined(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return false;
  }

  orElse(or: Optional<A>): Optional<A> {
    return this;
  }

  get(): A {
    return this.value;
  }

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

  isDefined(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return true;
  }

  orElse(or: Optional<A>): Optional<A> {
    return or;
  }

  get(): A {
    throw new Error('Cannot get Optional value because it is empty');
  }

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
