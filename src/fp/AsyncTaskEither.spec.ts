import { Either } from './Either';
import { AsyncTaskEither } from './AsyncTaskEither';

describe('AsyncTaskEither', () => {
  it('right', () => {
    return new AsyncTaskEither<string, boolean>(() => Either.right(true))
      .map(r => expect(r).toEqual(true))
      .mapLeft(fail)
      .execute();
  });

  it('left', () => {
    return new AsyncTaskEither<string, boolean>(() => Either.left('ERROR'))
      .map(fail)
      .mapLeft(l => expect(l).toEqual('ERROR'))
      .execute();
  });

  it('throws', () => {
    let ERROR = new Error('ERROR');

    return new AsyncTaskEither<string, boolean>(() => {
      throw ERROR;
      return Either.right(true);
    })
      .map(fail)
      .mapLeft(fail)
      .execute()
      .catch(e => expect(e).toEqual(ERROR));
  });

  it('throws safely catched', () => {
    let ERROR = new Error('ERROR');

    return new AsyncTaskEither<string, boolean>(() => {
      throw ERROR;
      return Either.right(true);
    })
      .handleExceptions((e) => `ERROR: ${ e }`)
      .map(fail)
      .mapLeft(l => expect(l).toEqual("ERROR: Error: ERROR"))
      .execute();
  });

  it('wrap promise with either (success)', () => {
    return AsyncTaskEither.wrap<string, boolean>(
      () => Promise.resolve<boolean>(true),
      (e) => `ERROR: ${ e }`,
    )
      .mapLeft(fail)
      .map((r) => expect(r).toEqual(true))
      .execute();
  });

  it('wrap promise with either (failure)', () => {
    return AsyncTaskEither.wrap<string, boolean>(
      () => Promise.reject(new Error('ERROR MESSAGE')),
      (e) => `ERROR: ${ e }`,
    )
      .map(fail)
      .mapLeft(l => expect(l).toEqual('ERROR: Error: ERROR MESSAGE'))
      .execute();
  });
});
