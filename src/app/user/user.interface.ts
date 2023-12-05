import { Model } from 'mongoose';

export interface TUserName {
  firstName: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TOrders {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
}

export interface TUserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}
