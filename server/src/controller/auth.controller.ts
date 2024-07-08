import {Request,Response, NextFunction } from "express";
import asyncHandler from "express-async-handler"
import { AuthService } from "../services/auth.service";
import HttpStatus from "../types/constants/http-statuscode";
import ApiResponse from "../utils/ApiResponse";

export class AuthController{
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async loginUser(req: Request, res: Response, next: NextFunction){
    const { email, password } = req.body;
    console.log(email,password,"propertiess")
    try{
        const {user,accessToken,refreshToken} = await this.authService.login(email,password)
        res.status(HttpStatus.OK).
      cookie('accesToken', accessToken)
      .cookie('refreshToken', refreshToken).
      json(new ApiResponse(HttpStatus.OK,{user,accessToken,refreshToken}, "user logged in succesfully"));


    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });
      }
}

 async logoutadmin(req: Request, res: Response, next: NextFunction)  {
  console.log("req",req.user)
  // const _id = req.user?._id;
  // await logoutAdmin(_id);

  res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, "User logout successfully"));
};
}

