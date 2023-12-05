"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
const UserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name must be at least 1 character long' }),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name must be at least 1 character long' }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z
        .string()
        .min(1, { message: 'Street name must be at least 1 character long' }),
    city: zod_1.z
        .string()
        .min(1, { message: 'City name must be at least 1 character long' }),
    country: zod_1.z
        .string()
        .min(1, { message: 'Country name must be at least 1 character long' }),
});
const OrdersProperty = zod_1.z.object({
    productName: zod_1.z
        .string()
        .min(1, { message: 'Product name must be at least 1 character long' }),
    price: zod_1.z.number().min(0.01, { message: 'Price must be a positive number' }),
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be at least 1' }),
});
exports.OrderValidationSchema = zod_1.z.array(OrdersProperty);
exports.UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().positive({ message: 'User ID must be a positive number' }),
    username: zod_1.z
        .string()
        .min(1, { message: 'Username must be at least 1 character long' }),
    password: zod_1.z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
    fullName: UserNameValidationSchema,
    age: zod_1.z.number().min(0, { message: 'Age must be a positive number' }),
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z
        .array(zod_1.z.string())
        .min(1, { message: 'At least one hobby must be provided' }),
    address: AddressValidationSchema,
    orders: exports.OrderValidationSchema.optional(),
});
