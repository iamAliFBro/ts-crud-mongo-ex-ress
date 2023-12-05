"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
// user name schema
const UserNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First Name is required.'] },
    lastName: { type: String, required: [true, 'Last Name is required.'] },
});
// user address schema
const UserAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, 'Street is required.'] },
    city: { type: String, required: [true, 'City is required.'] },
    country: { type: String, required: [true, 'Country is required.'] },
}, { _id: false });
// users orders schema
const OrdersSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    price: { type: Number, required: [true, 'Product price is required.'] },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required.'],
    },
}, { _id: false });
// user schema
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User id should be uniqe.'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'User id should be uniqe.'],
        unique: true,
    },
    password: { type: String, required: [true, 'Password is required.'] },
    fullName: {
        type: UserNameSchema,
        required: [true, 'Name is required.'],
    },
    age: { type: Number, required: [true, 'Age is required.'] },
    email: { type: String, required: [true, 'Email is required.'] },
    isActive: { type: Boolean, required: [true, 'Mode is required.'] },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        type: UserAddressSchema,
        required: true,
    },
    orders: {
        type: [OrdersSchema],
        default: [],
    },
});
// user pre schema middleware for password hassing
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.saltRounds));
        next();
    });
});
// post middleware for find user data
// method for remove password
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
UserSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield UserModel.findOne({ userId: id });
        return existingUser;
    });
};
// user model
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
