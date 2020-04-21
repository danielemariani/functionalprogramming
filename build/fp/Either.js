"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncTaskEither_1 = require("./AsyncTaskEither");
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
    leftMap(f) {
        return Either.left(f(this.value));
    }
    flatMap(f) {
        return Either.left(this.value);
    }
    toAsyncTaskEither() {
        return new AsyncTaskEither_1.AsyncTaskEither(() => Either.left(this.value));
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
    leftMap(f) {
        return Either.right(this.value);
    }
    flatMap(f) {
        return f(this.value);
    }
    toAsyncTaskEither() {
        return new AsyncTaskEither_1.AsyncTaskEither(() => Either.right(this.value));
    }
}
exports.Right = Right;
