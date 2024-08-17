import { Types } from "mongoose";
import { UserRolesEnum } from "../constants/user-role-enum";


interface BaseUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  resetToken?: string;
  resetTokenExpires?: number;
}

export interface IADMIN extends BaseUser {
  isAdmin?: boolean;
  phonenumber?: string;
  course?: string;
  batch?: string;
  subjects?: string[];
  mode?: string;
  isBlocked:boolean;
  resetToken?: string;
  resetTokenExpires?: number;
}

export interface IINSTRUCTOR extends BaseUser {
  phonenumber?: string;
  course?: string;
  batch?: string;
  subjects?: string[];
  mode?: string;
  isAdmin?: boolean;
  isBlocked:boolean
  resetToken?: string;
  resetTokenExpires?: number;

}

export interface ISTUDENT extends BaseUser {
  phonenumber?: string;
  course?: string;
  batch?: string;
  mode?: string;
  subjects?: string[];
  isAdmin?: boolean;
  isBlocked:boolean;
  resetToken?: string;
  resetTokenExpires?: number;
}

export type USER = IADMIN | IINSTRUCTOR | ISTUDENT;