// types.ts or user.types.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  phone?:number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
