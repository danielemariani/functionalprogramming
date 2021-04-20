"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
exports.compose = (f, g) => (a) => f(g(a));
