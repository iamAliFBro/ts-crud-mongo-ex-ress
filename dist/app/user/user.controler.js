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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControler = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = require("./user.validation");
// create user controler
const createUserInDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userData } = req.body;
        // validate data
        const validateData = user_validation_1.UserValidationSchema.parse(userData);
        const result = yield user_services_1.userServices.createUserInDB(validateData);
        res.status(200).json({
            success: true,
            message: 'User Created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error || error || 'something went wrong',
            },
        });
    }
});
// get users controler
const getUsersFromDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users loaded successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
// get single user controler
const getUserFromDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const result = yield user_services_1.userServices.getUserFromDB(id);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong.',
            error: {
                code: 404,
                description: error.message || 'Server error.',
            },
        });
    }
});
// update user information
const updateUserInfoControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const { userData: updateUserdData } = req.body;
        // validate data
        user_validation_1.UserValidationSchema.parse(updateUserdData);
        const result = yield user_services_1.userServices.updateUserInfo(id, updateUserdData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong.',
            error: {
                code: 404,
                description: error.message || 'Server error.',
                error: error,
            },
        });
    }
});
// delete user
const deleteUserFromDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const result = yield user_services_1.userServices.deleteUserFromDB(id);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
// post order
const addOrderInDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const { orderData } = req.body;
        // validate data
        user_validation_1.OrderValidationSchema.parse(orderData);
        const result = yield user_services_1.userServices.addOrderInDB(id, orderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
// get order
const getOrderFromDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const result = yield user_services_1.userServices.getOrderFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
// get total price
const getTotalPriceFromDBControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: id } = req.params;
        const result = yield user_services_1.userServices.getTotalPriceFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: result,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'something went wrong',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
exports.userControler = {
    createUserInDBControler,
    getUsersFromDBControler,
    getUserFromDBControler,
    updateUserInfoControler,
    deleteUserFromDBControler,
    addOrderInDBControler,
    getOrderFromDBControler,
    getTotalPriceFromDBControler,
};
