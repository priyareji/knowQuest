import { Request, Response } from "express";
import { register } from "../services/admin.service";
import AppError from "../utils/AppError";
import HttpStatus from "../types/constants/http-statuscode";
import ApiResponse from "../utils/ApiResponse";

export const createAdmin = async (req:Request,res:Response):Promise<void>=>{
    try{
        const admin=await register({...req.body,role:'admin'})
        if (!admin) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: admin }, "Admin registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }

}
export const createInstructor = async (req:Request,res:Response):Promise<void>=>{
    try{
        const insturctor= await register({...req.body,role:'instructor'})
        if (!insturctor) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: insturctor }, "Instructor registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }

}
export const createStudent = async (req:Request,res:Response):Promise<void>=>{
    try{
        const student=await register({...req.body,role:'student'})
        if (!student) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: student }, "Student registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }

}
