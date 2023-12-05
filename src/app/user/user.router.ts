import express from 'express';
import { userControler } from './user.controler';

const router = express.Router();

// create user router
router.post('/', userControler.createUserInDBControler);

// get all users router
router.get('/', userControler.getUsersFromDBControler);

// get single user router
router.get('/:userId', userControler.getUserFromDBControler);

// update user information
router.put('/:userId', userControler.updateUserInfoControler);

// delete user
router.delete('/:userId', userControler.deleteUserFromDBControler);

// add order
router.put('/:userId/orders', userControler.addOrderInDBControler);

// get order
router.get('/:userId/orders', userControler.getOrderFromDBControler);

// get total price
router.get(
  '/:userId/orders/total-price',
  userControler.getTotalPriceFromDBControler,
);



export const userRouter = router;
