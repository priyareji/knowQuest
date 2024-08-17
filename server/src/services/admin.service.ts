//import { getAllInstructor, getAllStudent } from "../controller/admin.controller";
//import { createAdmin, createInstructor, createStudent, findInstructorById, findStudentById, getAllinstructors, getAllstudents } from "../repository/adminRepository";
import { Batch, IBatch } from "../models/Batch";
import { Course, ICourse } from "../models/Course";
import { IMode } from "../models/Mode";
import { ISubject, Subject } from "../models/Subject";
import { AdminRepository } from "../repository/adminRepository";
import { findUserByEmail } from "../repository/userRepository";
import HttpStatus from "../types/constants/http-statuscode";
import { UserRolesEnum } from "../types/constants/user-role-enum";
import { IINSTRUCTOR,ISTUDENT,IADMIN } from "../types/model/IUser.interface";
import AppError from "../utils/AppError";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { EmailService } from "./email.service";

export class  AdminService{
  saltRounds =10;

  private adminRepository:AdminRepository;
  private emailService:EmailService;
  constructor(){
    this.adminRepository= new AdminRepository();
    this.emailService= new EmailService();
  }
async  register (userData:IINSTRUCTOR | IADMIN | ISTUDENT){
    const {name,email,password,phonenumber,role,isAdmin,course,batch,subjects,mode,isBlocked}=userData

    //check if user already exits
    const existingUser=await findUserByEmail(email);
    if(existingUser){
      console.log(existingUser,"existingg")
        throw new  AppError('This email is already associated with an account', HttpStatus.BAD_REQUEST);
    }

     //Hash PAssword
     const hashedPassword=await bcrypt.hash(password,this.saltRounds);

      //Handle different roles 
      let newUser;

      switch(role){
        case UserRolesEnum.ADMIN:
          newUser = await this.adminRepository.createAdmin({...userData, password: hashedPassword});
          break;
        case UserRolesEnum.INSTRUCTOR:
          newUser = await this.adminRepository.createInstructor({...userData, password: hashedPassword});
          const resetToken = crypto.randomBytes(20).toString('hex')
          await this.adminRepository.saveInstructorResetToken(newUser.id,resetToken);
          await this.emailService.sendPasswordResetEmail(userData.email,resetToken)
          break;
        case UserRolesEnum.STUDENT:
          newUser = await this.adminRepository.createStudent({...userData, password: hashedPassword});
          const resetTokenStudent = crypto.randomBytes(20).toString('hex')
          await this.adminRepository.saveStudentResetToken(newUser.id,resetTokenStudent);
          await this.emailService.sendPasswordResetEmail(userData.email,resetTokenStudent)
          break;
        default:
          throw new Error('Invalid role');
      }
      return newUser;
}


async  getAllInstructors():Promise<IINSTRUCTOR[]>{
  return await this.adminRepository.getAllinstructors() 
}
async  getAllStudents():Promise<ISTUDENT[]> {
  return await this.adminRepository.getAllstudents()
}
async  editInstructorById(id: string, instructorData: Partial<IINSTRUCTOR>): Promise<IINSTRUCTOR>{
  const instructor = await this.adminRepository.findInstructorById(id);
  if (!instructor) {
    throw new Error('Instructor not found');
  }

  // Update instructor fields
  Object.assign(instructor, instructorData);
  await instructor.save();
  return instructor as IINSTRUCTOR;
}
async editStudentById (id: string, studentData: Partial<ISTUDENT>): Promise<ISTUDENT>{
  const student = await this.adminRepository.findStudentById(id);
  if (!student) {
    throw new Error('student not found');
  }

  // Update instructor fields
  Object.assign(student, studentData);
  await student.save();
  return student as ISTUDENT;
}

async getInstructorById(id: string): Promise<IINSTRUCTOR | null>{
  const instructor = await this.adminRepository.findInstructorById(id);
  return instructor as IINSTRUCTOR
}
async  getStudentById(id: string): Promise<IINSTRUCTOR | null>{
  const student = await this.adminRepository.findStudentById(id);
  return student as IINSTRUCTOR
}

async createMode(modeData:Partial<IMode>):Promise<IMode>{
  // const mode = await this.adminRepository.findModeByModeName(modeData);
  // console.log(mode,"mode")
  // if (mode) {
  //   throw new  AppError('This mode is already exit', HttpStatus.BAD_REQUEST);
  // }
  return await this.adminRepository.createMode(modeData);
}
async getAllModes(): Promise<IMode[]> {
  return await this.adminRepository.getAllModes();
}

async getModeById(id: string): Promise<IMode | null> {
  return await this.adminRepository.getModeById(id);
}

async deleteMode(id: string): Promise<IMode | null> {
  return await this.adminRepository.deleteMode(id);
}

async createBatch(batchName: string, modeId: string,courseId: string){
  try{
    const batch = await this.adminRepository.findBatchByBatchName(batchName);
    console.log(batch,"batch")
    if (batch) {
      throw new  AppError('This batch is already exit', HttpStatus.BAD_REQUEST);
    }
    return await this.adminRepository.CreateBatch(batchName, modeId,courseId)
  }
  catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Error creating batch: ' + (error as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async getAllBatches(){
  try{
    return await this.adminRepository.getAllBatches()
  }
  catch(error){
    throw new Error('Error in BatchService getAllBatches: ' + (error as Error).message)
  }
}

async getBatchById(batchId: string){
  try {
    return await this.adminRepository.getBatchById(batchId)
  } catch (error) {
    console.error('Error fetching batch:', error);
    throw error;
  }
}
async getCourseById(courseId: string){
  try {
    return await this.adminRepository.getCourseById(courseId)
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}
async deleteBatch(id:string){
  try{
    return await this.adminRepository.deleteBatch(id);
  }
  catch(error){
    throw new Error('Error in BatchService delete Batch: ' + (error as Error).message)
  }
}
async updateBatch(batchId: string, updateData: Record<string, string>): Promise<IBatch | null> {
  try {
    // Find and update the batch
    const updatedBatch = await Batch.findByIdAndUpdate(batchId, updateData, { new: true }).exec();
    return updatedBatch;
  } catch (error) {
    console.error('Error updating batch:', error);
    throw error;
  }
}
async updateCourse(courseId: string, updateData: Record<string, string>): Promise<ICourse | null> {
  try {
    // Find and update the batch
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true }).exec();
    return updatedCourse;
  } catch (error) {
    console.error('Error updating Course:', error);
    throw error;
  }
}
async updatesubject(subjectId:string,updateData: Record<string, string>): Promise<ISubject | null>{
  try {
    // Find and update the batch
    const updatedsubject= await Subject.findByIdAndUpdate(subjectId, updateData, { new: true }).exec();
    return updatedsubject;
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
}
async createCourse(courseName: string, description: string,subjectIds:string[]) {
  try {
    const course = await this.adminRepository.findCourseByName(courseName);
    
    if (course) {
      throw new  AppError('This course is already exit', HttpStatus.BAD_REQUEST);
    }
    return await this.adminRepository.createCourse(courseName, description,subjectIds);
  } catch (error) {
    throw new Error('Error creating course: ' + (error as Error).message);
  }
}

async getCourses() {
  try {
    return await this.adminRepository.getCourses();
  } catch (error) {
    throw new Error('Error fetching courses: ' + (error as Error).message);
  }
}

async deleteCourse(courseId: string) {
  try {
    await this.adminRepository.deleteCourse(courseId);
  } catch (error) {
    throw new Error('Error deleting course: ' + (error as Error).message);
  }
}
async createSubject(subjectName: string) {
  try {
    const subject = await this.adminRepository.findSubjectByName(subjectName);
    
    console.log(subject,"subjectt")
    if (subject) {
      throw new  AppError('This subject is already exit', HttpStatus.BAD_REQUEST);
    }

    return await this.adminRepository.createSubject(subjectName);
  } catch (error) {
    throw new Error('Error creating subject: ' + (error as Error).message);
  }
}

async getSubjects() {
  try {
    return await this.adminRepository.getSubjects();
  } catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
}
async getSubject(subjectId: string) {
  try {
   return await this.adminRepository.getSubject(subjectId);
  } catch (error) {
    throw new Error('Error  fetching subject: ' + (error as Error).message);
  }
}

async deleteSubject(subjectId: string) {
  try {
    await this.adminRepository.deleteSubject(subjectId);
  } catch (error) {
    throw new Error('Error deleting subject: ' + (error as Error).message);
  }
}
async updateSubjectStatus(subjectId: string, isActive: boolean) {
  try {
    return await this.adminRepository.updateSubjectStatus(subjectId, isActive);
  } catch (error) {
    throw new Error('Error updating subject status: ' + (error as Error).message);
  }
}
async getInstructorInfo(){
  
}

async blockInstructor(id:string){
  try{
    return await this.adminRepository.blockInstuctorById(id)
  }
  catch(error){
    throw new Error('Error blocking Instructor:' + (error as Error).message)
  }
}
async unblockInstructor(id:string){
  try{
    return await this.adminRepository.unblockInstuctorById(id)
  }
  catch(error){
    throw new Error('Error blocking Instructor:' + (error as Error).message)
  }
}

async blockStudent(id:string){
  try{
    return await this.adminRepository.blockStudentById(id)
  }
  catch(error){
    throw new Error('Error blocking Student '+ (error as Error).message)
  }
}
async unblockStudent(id:string){
  try{
    return await this.adminRepository.unblockStudentById(id)
  }
  catch(error){
    throw new Error('Error blocking Student '+ (error as Error).message)
  }
}

}


