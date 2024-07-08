import { UserRolesEnum } from "../constants/user-role-enum";

export interface IUser {
     //_id?: string;
    name: string;
    email: string;
    password: string;
    phonenumber?: number;
    role:string;
    isAdmin?: boolean;
    course?: string;
    batch?: string;
    subject?: string;
    mode?: string;
    refreshToken?: string ;
  }