"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("./Either");
class Optional {
    static some(value) {
        return new Some(value);
    }
    static none() {
        return new None();
    }
    static fromOptionalValue(a) {
        return (typeof a === 'undefined' || a === null)
            ? Optional.none()
            : Optional.some(a);
    }
}
exports.Optional = Optional;
class Some extends Optional {
    constructor(value) {
        super();
        this.value = value;
    }
    isDefined() {
        return true;
    }
    isEmpty() {
        return false;
    }
    orElse(or) {
        return this;
    }
    get() {
        return this.value;
    }
    getOrElse(or) {
        return this.value;
    }
    map(f) {
        return new Some(f(this.value));
    }
    flatMap(f) {
        return f(this.value);
    }
    toEither(l) {
        return Either_1.Either.right(this.value);
    }
}
exports.Some = Some;
class None extends Optional {
    isDefined() {
        return false;
    }
    isEmpty() {
        return true;
    }
    orElse(or) {
        return or;
    }
    get() {
        throw new Error('Cannot get Optional value because it is empty');
    }
    getOrElse(or) {
        return or;
    }
    map(f) {
        return new None();
    }
    flatMap(f) {
        return new None();
    }
    toEither(l) {
        return Either_1.Either.left(l);
    }
}
exports.None = None;
