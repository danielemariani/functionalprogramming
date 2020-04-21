"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = (fn) => (t1) => fn(t1);
exports.curry2 = (fn) => (t1) => (t2) => fn(t1, t2);
exports.curry3 = (fn) => (t1) => (t2) => (t3) => fn(t1, t2, t3);
exports.curry4 = (fn) => (t1) => (t2) => (t3) => (t4) => fn(t1, t2, t3, t4);
exports.curry5 = (fn) => (t1) => (t2) => (t3) => (t4) => (t5) => fn(t1, t2, t3, t4, t5);
exports.curry6 = (fn) => (t1) => (t2) => (t3) => (t4) => (t5) => (t6) => fn(t1, t2, t3, t4, t5, t6);
