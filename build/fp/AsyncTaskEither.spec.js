"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("./Either");
const AsyncTaskEither_1 = require("./AsyncTaskEither");
describe('AsyncTaskEither', () => {
    it('right', () => {
        return new AsyncTaskEither_1.AsyncTaskEither(() => Either_1.Either.right(true))
            .map(r => expect(r).toEqual(true))
            .mapLeft(fail)
            .execute();
    });
    it('left', () => {
        return new AsyncTaskEither_1.AsyncTaskEither(() => Either_1.Either.left('ERROR'))
            .map(fail)
            .mapLeft(l => expect(l).toEqual('ERROR'))
            .execute();
    });
    it('throws', () => {
        let ERROR = new Error('ERROR');
        return new AsyncTaskEither_1.AsyncTaskEither(() => {
            throw ERROR;
            return Either_1.Either.right(true);
        })
            .map(fail)
            .mapLeft(fail)
            .execute()
            .catch(e => expect(e).toEqual(ERROR));
    });
    it('throws safely catched', () => {
        let ERROR = new Error('ERROR');
        return new AsyncTaskEither_1.AsyncTaskEither(() => {
            throw ERROR;
            return Either_1.Either.right(true);
        })
            .handleExceptions((e) => `ERROR: ${e}`)
            .map(fail)
            .mapLeft(l => expect(l).toEqual("ERROR: Error: ERROR"))
            .execute();
    });
    it('wrap promise with either (success)', () => {
        return AsyncTaskEither_1.AsyncTaskEither.wrap(() => Promise.resolve(true), (e) => `ERROR: ${e}`)
            .mapLeft(fail)
            .map((r) => expect(r).toEqual(true))
            .execute();
    });
    it('wrap promise with either (failure)', () => {
        return AsyncTaskEither_1.AsyncTaskEither.wrap(() => Promise.reject(new Error('ERROR MESSAGE')), (e) => `ERROR: ${e}`)
            .map(fail)
            .mapLeft(l => expect(l).toEqual('ERROR: Error: ERROR MESSAGE'))
            .execute();
    });
});
