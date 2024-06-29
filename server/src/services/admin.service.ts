import { createAdmin, createInstructor, createStudent } from "../repository/adminRepository";
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