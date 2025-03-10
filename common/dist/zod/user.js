"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().email("Please enter a valid email address"),
    password: zod_1.z.string().min(6, "Password must be of at least 6 characters long"),
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().email("Please enter a valid email address"),
    password: zod_1.z.string(),
});
