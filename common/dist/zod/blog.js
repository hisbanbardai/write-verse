"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(6, "Title must be of at least 6 characters"),
    content: zod_1.z.string().min(6, "Content must be of at least 6 characters"),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(6, "Title must be of at least 6 characters").optional(),
    content: zod_1.z
        .string()
        .min(6, "Content must be of at least 6 characters")
        .optional(),
});
