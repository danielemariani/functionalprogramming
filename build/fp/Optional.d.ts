export declare abstract class Optional<A> {
    static some<A>(value: A): Some<A>;
    static none<A>(): None<A>;
    static fromOptionalValue<A>(a?: A): Optional<A>;
    abstract getOrElse(or: A): A;
    abstract map<B>(f: (a: A) => B): Optional<B>;
    abstract flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
}
export declare class Some<A> extends Optional<A> {
    private readonly value;
    constructor(value: A);
    getOrElse(or: A): A;
    map<B>(f: (a: A) => B): Optional<B>;
    flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
}
export declare class None<A> extends Optional<A> {
    getOrElse(or: A): A;
    map<B>(f: (a: A) => B): Optional<B>;
    flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;
}
