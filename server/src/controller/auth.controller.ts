import {Request,Response, NextFunction } from "express";
import asyncHandler from "express-async-handler"
import { login } from "../services/auth.service";
import HttpStatus from "../types/constants/http-statuscode";
import ApiResponse from "../utils/ApiResponse";

export const loginUser = asyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const { email, password } = req.body;
    try{
        const {user,accessToken,refreshToken} = await login(email,password)
        res.status(HttpStatus.OK).
      cookie('accesToken', accessToken)
      .cookie('refreshToken', refreshToken).
      json(new ApiResponse(HttpStatus.OK,{user,accessToken,refreshToken}, "user logged in succesfully"));


    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });
      }
})