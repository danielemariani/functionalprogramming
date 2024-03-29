import { Either } from './Either';
export declare abstract class Optional<A> {
    static some<A>(value: A): Some<A>;
    static none<A>(): None<A>;
    static fromOptionalValue<A>(a?: A): Optional<A>;
    abstract isDefined(): boolean;
    abstract isEmpty(): boolean;
    abstract orElse(or: Optional<A>): Optional<A>;
    abstract get(): A;
    abstract getOrElse(or: A): A;
    abstract map<B>(f: (a: A) => B): Optional<B>;
    abstract flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
    abstract toEither<L>(l: L): Either<L, A>;
}
export declare class Some<A> extends Optional<A> {
    private readonly value;
    constructor(value: A);
    isDefined(): boolean;
    isEmpty(): boolean;
    orElse(or: Optional<A>): Optional<A>;
    get(): A;
    getOrElse(or: A): A;
    map<B>(f: (a: A) => B): Optional<B>;
    flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
    toEither<L>(l: L): Either<L, A>;
}
export declare class None<A> extends Optional<A> {
    isDefined(): boolean;
    isEmpty(): boolean;
    orElse(or: Optional<A>): Optional<A>;
    get(): A;
    getOrElse(or: A): A;
    map<B>(f: (a: A) => B): Optional<B>;
    flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
    toEither<L>(l: L): Either<L, A>;
}
