import { TOrders, TUser } from './user.interface';
import UserModel from './user.model';

const createUserInDB = async (userData: TUser) => {
  if (await UserModel.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists.');
  }
  const result = await UserModel.create(userData);
  return result;
};

const getUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserInfo = async (id: string, updatedData: TUser) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }
  const result = await UserModel.findOneAndUpdate({ userId: id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User already deleted.');
  }
  await UserModel.deleteOne({ userId: id });
  const result = await UserModel.isUserExists(id);
  return result;
};

const addOrderInDB = async (id: string, orderData: TOrders) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }

  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $push: { orders: orderData } },
    { new: true },
  );

  return result;
};

const getOrderFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }
  const result = await UserModel.findOne({ userId: id }, { _id: 0, orders: 1 });
  return result;
};

const getTotalPriceFromDB = async (id: string) => {
  let totalPrice = 0;

  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }

  const user = await UserModel.findOne({ userId: id });

  user?.orders?.forEach((order) => {
    totalPrice = order.price * order.quantity + totalPrice;
  });

  return totalPrice;
};

export const userServices = {
  createUserInDB,
  getUsersFromDB,
  getUserFromDB,
  updateUserInfo,
  deleteUserFromDB,
  addOrderInDB,
  getOrderFromDB,
  getTotalPriceFromDB,
};
