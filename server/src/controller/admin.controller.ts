import { NextFunction, Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import AppError from "../utils/AppError";
import HttpStatus from "../types/constants/http-statuscode";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "express-async-handler"
import { Admin } from "../models/Admin";
import { UserRolesEnum } from "../types/constants/user-role-enum";
import { AdminRepository } from "../repository/adminRepository";

export class AdminController {
    private adminService:AdminService
    private adminRepository:AdminRepository
    constructor(){
        this.adminService = new AdminService();
        this.adminRepository = new AdminRepository()
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
async instructoResetPassword(req:Request,res:Response):Promise<void>{
  try{
    const {token,newPassword} = req.body;
    const user = await this.adminRepository.findInstructorByResetToken(token);
    if(!user){
       res.status(400).json({error:'Invalid or expired token'})
    }
    else{
    await this.adminRepository.updateInstructorPassword(user._id.toString(),newPassword)
    res.status(200).json({message:'Password updated successfully'})
  }}catch(error){
    res.status(500).json({error:'Error resetting password'});
  }
}
async studentResetPassword(req:Request,res:Response):Promise<void>{
  try{
    const {token,newPassword} = req.body;
    const user = await this.adminRepository.findStudentByResetToken(token);
    if(!user){
     res.status(400).json({error:'Invalid or expired token'})
    }
    else{
    await this.adminRepository.updateStudentPassword(user._id.toString(),newPassword)
    res.status(200).json({message:'Password updated successfully'})
  }}catch(error){
    res.status(500).json({error:'Error resetting password'});
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
    const { batchName, mode,course } = req.body;
    const modeId = mode._id; // Extract modeId from mode object
    const courseId = course._id;
    const batch = await this.adminService.createBatch(batchName, modeId,courseId);
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

async updateBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { batchId } = req.params;
  const payload = req.body;

  try {
    // Validate payload if necessary
    if (!batchId || !payload) {
      return next(new AppError('Invalid data provided', HttpStatus.BAD_REQUEST));
    }

    // Update batch
    const updatedBatch = await this.adminService.updateBatch(batchId, payload);

    if (!updatedBatch) {
      return next(new AppError('Batch not found', HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      message: 'Batch updated successfully',
      data: updatedBatch
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    next(new AppError('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
  }
}

async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { courseId } = req.params;
  const payload = req.body;

  try {
    // Validate payload if necessary
    if (!courseId || !payload) {
      return next(new AppError('Invalid data provided', HttpStatus.BAD_REQUEST));
    }

    // Update batch
    const updatedCourse = await this.adminService.updateCourse(courseId, payload);

    if (!updatedCourse) {
      return next(new AppError('Course not found', HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    next(new AppError('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
  }
}

async updateSubject (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { subjectId } = req.params;
  const payload = req.body;

  try {
    // Validate payload if necessary
    if (!subjectId || !payload) {
      return next(new AppError('Invalid data provided', HttpStatus.BAD_REQUEST));
    }

    // Update batch
    const updatedSubject = await this.adminService.updatesubject(subjectId, payload);

    if (!updatedSubject) {
      return next(new AppError('Subject not found', HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      message: 'Subject updated successfully',
      data: updatedSubject
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    next(new AppError('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
  }
}
async getCourseById(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { courseId } = req.params;

  try {
    // Validate courseId
    if (!courseId) {
      return next(new AppError('Course ID is required', HttpStatus.BAD_REQUEST));
    }

    // Fetch course
    const course = await this.adminService.getCourseById(courseId);

    if (!course) {
      return next(new AppError('Course not found', HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      message: 'Course retrieved successfully',
      data: course
    });
  } catch (error) {
    console.error('Error retrieving course:', error);
    next(new AppError('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
  }
}

async getBatchById(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { batchId } = req.params;

  try {
    const batch = await this.adminService.getBatchById(batchId);

    if (!batch) {
      return next(new AppError('Batch not found', HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      data: batch,
      message: 'Batch retrieved successfully',
     
    });
  } catch (error) {
    console.error('Error retrieving batch:', error);
    next(new AppError('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
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
    const { courseName, description,subject } = req.body;
    
    const course = await  this.adminService.createCourse(courseName, description,subject);
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
            const { subjectName} = req.body;
            console.log(subjectName)
            
            //const courseId = course._id; 
            const subject = await  this.adminService.createSubject(subjectName);
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
        
        getSubject = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const subjectId  = req.params.id;
           const subject = await  this.adminService.getSubject(subjectId);
           console.log(subject,"subbbbb")
           res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{subject}, "subject are fetched"));
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



blockInstructor = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.params.id;
    const instructor = await this.adminService.blockInstructor(id);
    res.status(HttpStatus.OK).json({message:'Instructor Blocked',instructor})
  }
  catch(error){
    next(error);
  }
}
unblockInstructor = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.params.id;
    const instructor = await this.adminService.unblockInstructor(id);
    res.status(HttpStatus.OK).json({message:'Instructor unBlocked',instructor})
  }
  catch(error){
    next(error);
  }
}

blockStudent =async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const id=req.params.id;
    const student= await this.adminService.blockStudent(id);
    res.status(HttpStatus.OK).json({message:'This Student is Blocked',student})
  }
  catch(error){
    next(error)
  }
}
unblockStudent =async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const id=req.params.id;
    const student= await this.adminService.unblockStudent(id);
    res.status(HttpStatus.OK).json({message:'This Student is UnBlocked',student})
  }
  catch(error){
    next(error)
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