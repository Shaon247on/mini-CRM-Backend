"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const zod_1 = require("zod");
exports.clientSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string().min(1, { message: "Client name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    phone: zod_1.z
        .string()
        .min(11, { message: "Phone number must be at least 11 digits" }),
    company: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    creatorId: zod_1.z.number().int({ message: "Creator ID must be an integer" }).min(1, { message: "Creator ID is required" }),
});
