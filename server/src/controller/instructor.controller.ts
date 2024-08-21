import { Request,Response,NextFunction, RequestHandler } from "express";
import AppError from "../utils/AppError";
import HttpStatus from "../types/constants/http-statuscode";
import { USER } from "../types/model/IUser.interface";
import { AdminService } from "../services/admin.service";
import ApiResponse from "../utils/ApiResponse";
import { IUnit } from "../models/Unit";
import { InstructorService } from "../services/instructor.service";
import { IVideo } from "../models/Video";
import { upload } from "../middlewares/multer";
import { IAssignment, IQuestion } from "../models/Assignment";
import { hashPassword } from '../utils/hashPassword';
import bcrypt from 'bcrypt';
import { InstructorRepository } from "../repository/instructorRepository";


export class InstructorController {
    private adminService:AdminService
    private instructorService:InstructorService
    private instructorRepository:InstructorRepository
     SALT_ROUNDS = 10;

    constructor(){
        this.adminService = new AdminService();
        this.instructorService = new InstructorService()
        this.instructorRepository = new InstructorRepository()
    }

   

    async getInstructorInfo(req:Request, res: Response, next: NextFunction){
        const user = req.user as USER; // Type assertion
        console.log("reqqq", user?._id?.toString()); 
        const id=user?._id?.toString()
        try{
            const instructor =await this.adminService.getInstructorById(id);
            // console.log(instructor,"instructorrrr")
            if (!instructor) {
                res.status(404).json({ message: 'Instructor not found' });
              } else {
                  res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: instructor},'Instructor Info got Successfully'))
              }
            } catch (error) {
              res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
            }

    }


    
 async createUnit(req:Request,res:Response,next:NextFunction){
    try{
        const unitData:IUnit = req.body;
        const unit = await this.instructorService.createUnit(unitData);
        res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,unit,'Unit updated Successfully'))

    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
      }
 }
 async getUnitsBySubjectId(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const {subjectId} = req.params;
        const units = await this.instructorService.getUnitsBySubjectId(subjectId);
        res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,units,'Unit Info got Successfully'))
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
      }
 }
 
async createChapter(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const chapterData = req.body;
        const chapter = await this.instructorService.createChapter(chapterData);
        res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,chapter,'Chapter Created Successfully'))
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
      }
}

async createSection(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sectionName, sectionDescription, chapterId, unitId, subjectId, videoType, videoUrl } = req.body;
      const files = req.files as Express.Multer.File[];
  
      console.log('Request body:', req.body);
      console.log('Files:', files);
  
      if (!files || files.length === 0) {
        return next(new AppError('No files uploaded', HttpStatus.BAD_REQUEST));
      }
  
      const sectionData = {
        sectionName,
        sectionDescription,
        chapterId,
        unitId,
        subjectId,
        videoType,
        videoUrl,
        files: files.map((file) => ({
          file_url: file.path,
          file_original_filename: file.originalname,
          file_fieldName: file.fieldname,
          file_path: file.path,
          file_type: file.mimetype,
          file_size: file.size.toString(),
          file_name: file.filename,
        })),
      };
  
      const section = await this.instructorService.createSection(sectionData);
      res.status(HttpStatus.CREATED).json({ message: 'Section created successfully', data: section });
    } catch (error) {
      console.error('Error creating section:', error);
      next(error instanceof AppError ? error : new AppError((error as Error).message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }


  async createBook (req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('Request body:', req.body);
    console.log('Files:', req.files);
  
    try {
      const bookData = req.body;
      if (req.files && Array.isArray(req.files)) {
        const files = (req.files as Express.Multer.File[]).map(file => ({
          file_url: file.path,
          file_original_filename: file.originalname,
          file_fieldName: file.fieldname,
          file_path: file.path,
          file_type: file.mimetype,
          file_size: file.size.toString(),
          file_name: file.filename,
          // Remove the file_binary field as it's not necessary and can cause issues
        }));
        bookData.files = files;
      }
      const book = await this.instructorService.createBook(bookData);
      res.status(HttpStatus.CREATED).json({ success: true, data: book, message: 'Book created successfully'})
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
  }

async createVideo(req: Request, res: Response, next: NextFunction): Promise<void>  {
    try {
      const videoData: IVideo = req.body;
      const video = await this.instructorService.createVideo(videoData);
      res.status(201).json({ success: true, data: video ,message: 'Video created successfully'});
    } catch (error) {
      next(error);
    }
  };

  async getChaptersByUnitId(req: Request, res: Response, next: NextFunction) {
    const unitId = req.params.unitId;
console.log("hello unit Id",unitId)
    try {
      const chapters = await this.instructorService.getChaptersByUnitId(unitId);
      console.log("chapters",chapters)
      res.status(HttpStatus.OK).json({ success:true,data: chapters,message:'Chaters fetched' });
    } catch (error) {
      next(error);
    }
  }
  async getSectionsByChapterId(req: Request, res: Response, next: NextFunction) {
    const chapterId = req.params.chapterId;

    try {
      const sections = await this.instructorService.getSectionsByChapterId(chapterId);
      res.status(HttpStatus.OK).json({success: true, data: sections,message:'Section got successfully' });
    } catch (error) {
      next(error);
    }
  }

  async createAssignment(req:Request,res:Response,next:NextFunction):Promise<void>{
    console.log("hello")
    try{
      const assignment: IAssignment = JSON.parse(req.body.assignmentUpdate);
      const files = req.files as Express.Multer.File[];

      if (assignment.questionType === 'upload-file' && files.length > 0) {
        const file = files.find(f => f.fieldname === 'file');
        if (file) {
          assignment.file = file.path; // Save file path
        }
      } else if (assignment.questionType === 'custom' && files.length > 0) {
        const questions: IQuestion[] = assignment.questions!.map((q,index: number) => {
          const file = files.find(f => f.fieldname === `questions[${index}].file`);
          return {
            question: q.question,
            file: file ? file.path : undefined
          };
        });
        assignment.questions = questions;
      }

      console.log(assignment,"assignmentt")
      console.log(assignment,'asss')
      const createdAssignment = await this.instructorService.createAssignment(assignment);
    res.status(HttpStatus.OK).json({success: true, data:createdAssignment,message:'Assignment got successfully' });
    }
    catch(error){
      res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
  }

  async getAssignmentByInstructorId(req:Request, res: Response, next: NextFunction){
    const user = req.user as USER; // Type assertion
    console.log("reqqq", user?._id?.toString()); 
    const id=user?._id?.toString()
    
    try{
        const assignment =await this.instructorService.getAssignmentByInstructorId(id);
        console.log(assignment,"assignment")
        if (!assignment) {
            res.status(404).json({ message: 'Instructor not found' });
          } else {
              res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,{user: assignment},'assignment Info got Successfully'))
          }
        } catch (error) {
          res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
        }

}

async createQuestion(req:Request,res:Response,next:NextFunction):Promise<void>{
  try{
      const questionData = req.body;
      const question = await this.instructorService.createQuestion(questionData);
      res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,question,'question Created Successfully'))
  }
  catch (error) {
      res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
}


async createLiveClass(req:Request,res:Response,next:NextFunction):Promise<void>{
  try{
      const liveData = req.body;
      const liveClass = await this.instructorService.createLiveClass(liveData);
      res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK,liveClass,'Live Class Created Successfully'))
  }
  catch (error) {
      res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
}

async changePassword(req: Request, res: Response) {
  try {
    const {email, currentPassword, newPassword } = req.body;
   // const userId = req.user.id; // Assuming the user ID is available in the request after authentication

    const user = await this.instructorRepository.findByEmail(email);

    if (!user ) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    const hashedPassword = await hashPassword(newPassword);
    await this.instructorRepository.updatePassword(email, hashedPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}



}
