"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTaskEither = void 0;
const Either_1 = require("./Either");
const AsyncTask_1 = require("./AsyncTask");
class AsyncTaskEither {
    constructor(task) {
        this.task = task;
    }
    static right(r) {
        return new AsyncTaskEither(() => Either_1.Either.right(r));
    }
    static left(l) {
        return new AsyncTaskEither(() => Either_1.Either.left(l));
    }
    static wrap(p, handleError) {
        return new AsyncTaskEither(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield p();
                return Either_1.Either.right(result);
            }
            catch (e) {
                return Either_1.Either.left(handleError(e));
            }
        }));
    }
    map(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => Either_1.Either.left(l), (r) => Either_1.Either.right(f(r)))));
    }
    mapLeft(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => Either_1.Either.left(f(l)), (r) => Either_1.Either.right(r))));
    }
    flatMap(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => new AsyncTaskEither(() => Either_1.Either.left(l)), (r) => f(r)).execute()));
    }
    flatMapLeft(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => f(l), (r) => new AsyncTaskEither(() => Either_1.Either.right(r))).execute()));
    }
    handleExceptions(handle) {
        return new AsyncTaskEither(() => this.execute().catch(e => Either_1.Either.left(handle(e))));
    }
    toAsyncTask() {
        return new AsyncTask_1.AsyncTask(() => this.execute()
            .then(either => either.fold((l) => { throw l; }, (r) => { return r; })));
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.task();
        });
    }
}
exports.AsyncTaskEither = AsyncTaskEither;
