"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Either {
    static left(l) {
        return new Left(l);
    }
    static right(r) {
        return new Right(r);
    }
}
exports.Either = Either;
class Left extends Either {
    constructor(value) {
        super();
        this.value = value;
    }
    fold(onLeft, onRight) {
        return onLeft(this.value);
    }
    map(f) {
        return Either.left(this.value);
    }
    flatMap(f) {
        return Either.left(this.value);
    }
}
exports.Left = Left;
class Right extends Either {
    constructor(value) {
        super();
        this.value = value;
    }
    fold(onLeft, onRight) {
        return onRight(this.value);
    }
    map(f) {
        return Either.right(f(this.value));
    }
    flatMap(f) {
        return f(this.value);
    }
}
exports.Right = Right;
