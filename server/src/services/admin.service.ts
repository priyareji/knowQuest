//import { getAllInstructor, getAllStudent } from "../controller/admin.controller";
import { createAdmin, createInstructor, createStudent, findInstructorById, findStudentById, getAllinstructors, getAllstudents } from "../repository/adminRepository";
import { findUserByEmail } from "../repository/userRepository";
import HttpStatus from "../types/constants/http-statuscode";
import { IUser } from "../types/model/IUser.interface";
import AppError from "../utils/AppError";
import bcrypt from 'bcrypt';


const saltRounds =10;
export const register=async (userData:IUser):Promise<IUser>=>{
    const {name,email,password,phonenumber,role,isAdmin,course,batch,subject,mode}=userData

    //check if user already exits
    const existingUser=await findUserByEmail(email);
    if(existingUser){
        throw new  AppError('This email is already associated with an account', HttpStatus.BAD_REQUEST);
    }

     //Hash PAssword
     const hashedPassword=await bcrypt.hash(password,saltRounds);

      //Handle different roles 
      let newUser;

      switch(role){
       case 'admin':
         newUser=await createAdmin({...userData,password:hashedPassword})
         break;
         case 'instructor':
           newUser=await createInstructor({...userData,password:hashedPassword})
           break;
         case 'student':
           newUser=await createStudent({...userData,password:hashedPassword})
           break;
           default:
             throw new Error('Invalid role')
      }
      return newUser
}


export const getAllInstructors=async():Promise<IUser[]> =>{
  return await getAllinstructors()
}
export const getAllStudents=async():Promise<IUser[]> => {
  return await getAllstudents()
}
export const editInstructorById = async (id: string, instructorData: Partial<IUser>): Promise<IUser> => {
  const instructor = await findInstructorById(id);
  if (!instructor) {
    throw new Error('Instructor not found');
  }

  // Update instructor fields
  Object.assign(instructor, instructorData);
  await instructor.save();
  return instructor;
}
export const editStudentById = async (id: string, studentData: Partial<IUser>): Promise<IUser> => {
  const student = await findStudentById(id);
  if (!student) {
    throw new Error('Instructor not found');
  }

  // Update instructor fields
  Object.assign(student, studentData);
  await student.save();
  return student;
}

export const getInstructorById = async (id: string): Promise<IUser | null> => {
  const instructor = await findInstructorById(id);
  return instructor
}
export const getStudentById = async (id: string): Promise<IUser | null> => {
  const student = await findStudentById(id);
  return student
}


