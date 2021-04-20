"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = exports.executeAndThrow = exports.passThrough = exports.accumulate = void 0;
exports.accumulate = (f) => (i) => {
    const o = f(i);
    return [i, o];
};
exports.passThrough = (f) => (i) => {
    f(i);
    return i;
};
exports.executeAndThrow = (f) => (i) => {
    f(i);
    throw i;
};
exports.isDefined = (x) => x !== null && typeof x !== 'undefined';
