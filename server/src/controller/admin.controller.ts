import { NextFunction, Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import AppError from "../utils/AppError";
import HttpStatus from "../types/constants/http-statuscode";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "express-async-handler"
import { Admin } from "../models/Admin";
import { UserRolesEnum } from "../types/constants/user-role-enum";

export class AdminController {
    private adminService:AdminService
    constructor(){
        this.adminService = new AdminService();
    }
async createAdmin (req:Request,res:Response):Promise<void>{
    try{
        const admin=await this.adminService.register({...req.body,role:UserRolesEnum.ADMIN})
        if (!admin) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: admin }, "Admin registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }

}
 async createInstructor (req:Request,res:Response):Promise<void>{
    try{
        const insturctor= await this.adminService.register({...req.body,role:UserRolesEnum.INSTRUCTOR})
        if (!insturctor) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: insturctor }, "Instructor registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }

}
 async createStudent (req:Request,res:Response):Promise<void>{
    try{
        const student=await this.adminService.register({...req.body,role:UserRolesEnum.STUDENT})
        if (!student) throw new AppError("Something went wrong while registering the user", HttpStatus.INTERNAL_SERVER_ERROR);
        res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { user: student }, "Student registered successfully"))
    }
    catch(error){
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });    
    }
}

async getAllInstructor (request:Request,response:Response,next:NextFunction){
        try{
            const instructors = await this.adminService.getAllInstructors();
            response.status(200).json(instructors);
        }
        catch (error:any) {
            console.log(error);
            throw new AppError(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
async  getAllStudent (request:Request,response:Response,next:NextFunction){
           
        try{
                const students = await this.adminService.getAllStudents();
                response.status(200).json(students);
            }
            catch (error:any) {
                console.log(error);
                throw new AppError(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

async editInstructorsById (req:Request,res:Response):Promise<void>  {

            try{
                const {id}=req.params;
                const instructorData = req.body;
                const updatedInstructor = await this.adminService.editInstructorById(id,instructorData);
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: updatedInstructor},'Instructor Info upadted Successfully'))

            }
            catch(error){
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                res.status(400).json({ message: errorMessage });    
            }
        }

        async  editStudentsById(req:Request,res:Response):Promise<void>{

            try{
                const {id}=req.params;
                const studentData = req.body;
                const updatedStudent = await this.adminService.editStudentById(id,studentData);
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: updatedStudent},'Student Info upadted Successfully'))

            }
            catch(error){
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                res.status(400).json({ message: errorMessage });    
            }
        }
        async   getInstructorId(req:Request,res:Response):Promise<void>{
        try {
            const instructor = await this.adminService.getInstructorById(req.params.id);
            if (!instructor) {
              res.status(404).json({ message: 'Instructor not found' });
            } else {
                res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: instructor},'Instructor Info got Successfully'))
            }
          } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
          }
        }
        async   getStudentId(req:Request,res:Response):Promise<void>{
            try {
                const student = await this.adminService.getStudentById(req.params.id);
                if (!student) {
                  res.status(404).json({ message: 'Student not found' });
                } else {
                    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: student},' GOt Student Info Successfully'))
                }
              } catch (error) {
                res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
              }
            }
    async createMode(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const mode = await this.adminService.createMode(req.body);
            res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { mode }, "Mode created successfully"))          

        }
        catch(error){
            throw new AppError( (error as Error).message,HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }

    getAllModes = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const modes = await this.adminService.getAllModes();
          res.status(200).json(modes);
        } catch (error) {
          next(error);
        }
      };
    
      getModeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const mode = await this.adminService.getModeById(req.params.id);
          if (!mode) {
            return res.status(404).json({ message: 'Mode not found' });
          }
          res.status(200).json(mode);
        } catch (error) {
          next(error);
        }
      };
    
      deleteMode = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const mode = await this.adminService.deleteMode(req.params.id);
          if (!mode) {
            return res.status(404).json({ message: 'Mode not found' });
          }
          res.status(200).json({ message: 'Mode deleted' });
        } catch (error) {
          next(error);
        }
      };

createBatch = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const { batchName, mode } = req.body;
    const modeId = mode._id; // Extract modeId from mode object
    const batch = await this.adminService.createBatch(batchName, modeId);
    res.status(HttpStatus.ACCEPTED).json(new ApiResponse(HttpStatus.OK, { batch }, "Batch created successfully"))   
  }
  catch(error){
    next(error)
  }
}
getAllBatches = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const batches = await this.adminService.getAllBatches();
    res.status(HttpStatus.OK).json(batches);
  }
  catch(error){
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
}


deleteBatch = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const batch = await this.adminService.deleteBatch(req.params.id)
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{batch}, "Batches are deleted"));
  }
  catch(error){
    next(error)
  }
}

createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseName, description } = req.body;
    
    const course = await  this.adminService.createCourse(courseName, description);
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    next(error);
  }
};

getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await  this.adminService.getCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId  = req.params.id;
    console.log(courseId)
    const course =await  this.adminService.deleteCourse(courseId);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{course}, "Courses are deleted"));
  } catch (error) {
    next(error);
  }

        }

createSubject = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const { subjectName, course } = req.body;
            console.log(subjectName,course)
            
            const courseId = course._id; 
            const subject = await  this.adminService.createSubject(subjectName, courseId);
            res.status(201).json({ message: 'Subject created successfully', subject });
          } catch (error) {
            next(error);
          }
        };
        
getSubjects = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const subjects = await  this.adminService.getSubjects();
            
            res.status(200).json(subjects);
          } catch (error) {
            next(error);
          }
        };
        
deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const subjectId  = req.params.id;
           const subject = await  this.adminService.deleteSubject(subjectId);
            res.status(200).json({ message: 'Subject deleted successfully',subject });
          } catch (error) {
            next(error);
          }
        };

        updateSubjectStatus = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const subjectId  = req.params.id;
            const { isActive } = req.body;
            const subject = await this.adminService.updateSubjectStatus(subjectId, isActive);
            res.status(200).json({ message: 'Subject status updated successfully', subject });
          } catch (error) {
            next(error);
          }
        }

      }












            // export const logoutAdmin = async (req: Response, res: Response, next: NextFunction) => {
            //     const studentData = req.body;
              
            //     if (!_id) {
            //       return res.status(HttpStatus.UNAUTHORIZED).json(new ApiResponse(HttpStatus.UNAUTHORIZED, {}, 'Unauthorized'));
            //     }
              
            //     const user = await Admin.findByIdAndUpdate(_id, { refreshAccessToken: undefined }, { new: true });
              
            //     if (!user) {
            //       return res.status(HttpStatus.NOT_FOUND).json(new ApiResponse(HttpStatus.NOT_FOUND, {}, 'User not found'));
            //     }
              
            //      res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, 'Logout successfully'));
            //   }