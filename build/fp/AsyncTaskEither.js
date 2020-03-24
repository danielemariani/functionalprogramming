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
const Either_1 = require("./Either");
const AsyncTask_1 = require("./AsyncTask");
class AsyncTaskEither {
    constructor(task) {
        this.task = task;
    }
    map(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => Either_1.Either.left(l), (r) => Either_1.Either.right(f(r)))));
    }
    flatMap(f) {
        return new AsyncTaskEither(() => this.execute()
            .then(r => r.fold((l) => new AsyncTaskEither(() => Either_1.Either.left(l)), (r) => f(r)).execute()));
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
