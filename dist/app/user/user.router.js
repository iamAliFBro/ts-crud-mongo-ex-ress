"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user.controler");
const router = express_1.default.Router();
// create user router
router.post('/', user_controler_1.userControler.createUserInDBControler);
// get all users router
router.get('/', user_controler_1.userControler.getUsersFromDBControler);
// get single user router
router.get('/:userId', user_controler_1.userControler.getUserFromDBControler);
// update user information
router.put('/:userId', user_controler_1.userControler.updateUserInfoControler);
// delete user
router.delete('/:userId', user_controler_1.userControler.deleteUserFromDBControler);
// add order
router.put('/:userId/orders', user_controler_1.userControler.addOrderInDBControler);
// get order
router.get('/:userId/orders', user_controler_1.userControler.getOrderFromDBControler);
// get total price
router.get('/:userId/orders/total-price', user_controler_1.userControler.getTotalPriceFromDBControler);
exports.userRouter = router;
