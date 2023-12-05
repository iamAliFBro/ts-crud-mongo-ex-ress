"use strict";
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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserInDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userData.userId.toString())) {
        throw new Error('User already exists.');
    }
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.default.findOne({ userId: id });
    return result;
});
const updateUserInfo = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User not found.');
    }
    const result = yield user_model_1.default.findOneAndUpdate({ userId: id }, updatedData, {
        new: true,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User already deleted.');
    }
    yield user_model_1.default.deleteOne({ userId: id });
    const result = yield user_model_1.default.isUserExists(id);
    return result;
});
const addOrderInDB = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User not found.');
    }
    const result = yield user_model_1.default.findOneAndUpdate({ userId: id }, { $push: { orders: orderData } }, { new: true });
    return result;
});
const getOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User not found.');
    }
    const result = yield user_model_1.default.findOne({ userId: id }, { _id: 0, orders: 1 });
    return result;
});
const getTotalPriceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let totalPrice = 0;
    if (!(yield user_model_1.default.isUserExists(id))) {
        throw new Error('User not found.');
    }
    const user = yield user_model_1.default.findOne({ userId: id });
    (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.forEach((order) => {
        totalPrice = order.price * order.quantity + totalPrice;
    });
    return totalPrice;
});
exports.userServices = {
    createUserInDB,
    getUsersFromDB,
    getUserFromDB,
    updateUserInfo,
    deleteUserFromDB,
    addOrderInDB,
    getOrderFromDB,
    getTotalPriceFromDB,
};
