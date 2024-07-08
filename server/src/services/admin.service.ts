//import { getAllInstructor, getAllStudent } from "../controller/admin.controller";
//import { createAdmin, createInstructor, createStudent, findInstructorById, findStudentById, getAllinstructors, getAllstudents } from "../repository/adminRepository";
import { IMode } from "../models/Mode";
import { AdminRepository } from "../repository/adminRepository";
import { findUserByEmail } from "../repository/userRepository";
import HttpStatus from "../types/constants/http-statuscode";
import { UserRolesEnum } from "../types/constants/user-role-enum";
import { IUser } from "../types/model/IUser.interface";
import AppError from "../utils/AppError";
import bcrypt from 'bcrypt';

export class  AdminService{
  saltRounds =10;

  private adminRepository:AdminRepository;
  constructor(){
    this.adminRepository= new AdminRepository();
  }
async  register (userData:IUser):Promise<IUser>{
    const {name,email,password,phonenumber,role,isAdmin,course,batch,subject,mode}=userData

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
          break;
        case UserRolesEnum.STUDENT:
          newUser = await this.adminRepository.createStudent({...userData, password: hashedPassword});
          break;
        default:
          throw new Error('Invalid role');
      }
      return newUser
}


async  getAllInstructors():Promise<IUser[]>{
  return await this.adminRepository.getAllinstructors()
}
async  getAllStudents():Promise<IUser[]> {
  return await this.adminRepository.getAllstudents()
}
async  editInstructorById(id: string, instructorData: Partial<IUser>): Promise<IUser>{
  const instructor = await this.adminRepository.findInstructorById(id);
  if (!instructor) {
    throw new Error('Instructor not found');
  }

  // Update instructor fields
  Object.assign(instructor, instructorData);
  await instructor.save();
  return instructor;
}
async editStudentById (id: string, studentData: Partial<IUser>): Promise<IUser>{
  const student = await this.adminRepository.findStudentById(id);
  if (!student) {
    throw new Error('Instructor not found');
  }

  // Update instructor fields
  Object.assign(student, studentData);
  await student.save();
  return student;
}

async getInstructorById(id: string): Promise<IUser | null>{
  const instructor = await this.adminRepository.findInstructorById(id);
  return instructor
}
async  getStudentById(id: string): Promise<IUser | null>{
  const student = await this.adminRepository.findStudentById(id);
  return student
}

async createMode(modeData:Partial<IMode>):Promise<IMode>{
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

async createBatch(batchName: string, modeId: string){
  try{
    return await this.adminRepository.CreateBatch(batchName, modeId)
  }
  catch(error){
  throw new Error('Error deleting batch: ' + (error as Error).message)
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

async deleteBatch(id:string){
  try{
    return await this.adminRepository.deleteBatch(id);
  }
  catch(error){
    throw new Error('Error in BatchService delete Batch: ' + (error as Error).message)
  }
}
async createCourse(courseName: string, description: string) {
  try {
    return await this.adminRepository.createCourse(courseName, description);
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
async createSubject(subjectName: string, courseId: string) {
  try {
    return await this.adminRepository.createSubject(subjectName, courseId);
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


}


