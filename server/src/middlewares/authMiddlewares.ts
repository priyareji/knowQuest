import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import configKey from "../configs/configkeys";
import { Admin } from "../models/Admin";
import { Instructor } from "../models/Instructor";
import { Student } from "../models/Student";
import HttpStatus from "../types/constants/http-statuscode";

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token =  req.cookies?.accessToken?.trim() || req.header("authorization")?.replace("Bearer","").trim();
    if (!token) throw new AppError("Unauthorized request", HttpStatus.UNAUTHORIZED);
    try {
        
        const secret = configKey().ACCESS_TOKEN_SECRET;
        const decodedToken =  jwt.verify(token,secret) as JwtPayload ;    
        let user = await Admin.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

    if (!user) {
      user = await Instructor.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
    }

    if (!user) {
      user = await Student.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
    }
        if (!user) throw new AppError("Invalid access token", HttpStatus.UNAUTHORIZED);
        req.user = user;
        next()
    } catch (error:any) {
            throw new AppError( error?.message || "Invalid access token",HttpStatus.UNAUTHORIZED);
    }
})
