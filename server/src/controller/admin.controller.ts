import { NextFunction, Request, Response } from "express";
import { editInstructorById, editStudentById, getAllInstructors, getAllStudents, getInstructorById, getStudentById, register } from "../services/admin.service";
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

    export const getAllInstructor = async (request:Request,response:Response,next:NextFunction)=>{
        try{
            const instructors = await getAllInstructors();
            response.status(200).json(instructors);
        }
        catch (error:any) {
            console.log(error);
            throw new AppError(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    export const getAllStudent = async (request:Request,response:Response,next:NextFunction)=>{
            try{
                const students = await getAllStudents();
                response.status(200).json(students);
            }
            catch (error:any) {
                console.log(error);
                throw new AppError(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    export const editInstructorsById = async (req:Request,res:Response):Promise<void> => {

            try{
                const {id}=req.params;
                const instructorData = req.body;
                const updatedInstructor = await editInstructorById(id,instructorData);
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: updatedInstructor},'Instructor Info upadted Successfully'))

            }
            catch(error){
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                res.status(400).json({ message: errorMessage });    
            }
        }

    export const editStudentsById = async (req:Request,res:Response):Promise<void> => {

            try{
                const {id}=req.params;
                const studentData = req.body;
                const updatedStudent = await editStudentById(id,studentData);
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: updatedStudent},'Student Info upadted Successfully'))

            }
            catch(error){
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                res.status(400).json({ message: errorMessage });    
            }
        }
     export const  getInstructorId  = async(req:Request,res:Response):Promise<void> =>{
        try {
            const instructor = await getInstructorById(req.params.id);
            if (!instructor) {
              res.status(404).json({ message: 'Instructor not found' });
            } else {
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: instructor},'Instructor Info got Successfully'))
            }
          } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
          }
        }
        export const  getStudentId  = async(req:Request,res:Response):Promise<void> =>{
            try {
                const student = await getStudentById(req.params.id);
                if (!student) {
                  res.status(404).json({ message: 'Student not found' });
                } else {
                    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: student},' GOt Student Info Successfully'))
                }
              } catch (error) {
                res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
              }
            }
     
  
