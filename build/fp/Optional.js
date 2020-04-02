"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    getOrElse(or) {
        return this.value;
    }
    map(f) {
        return new Some(f(this.value));
    }
    flatMap(f) {
        return f(this.value);
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
    getOrElse(or) {
        return or;
    }
    map(f) {
        return new None();
    }
    flatMap(f) {
        return new None();
    }
}
exports.None = None;
