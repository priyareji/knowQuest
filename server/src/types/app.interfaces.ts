import { Request } from "express";
import { USER} from "../types/model/IUser.interface"
export interface AccessTokenAndrefreshTokenInterface{
    accessToken: string;
    refreshToken: string;
    
}
