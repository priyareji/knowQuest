//import { IUser } from '../types/model/IUser.interface';
import { Admin, AdminDocument } from '../models/Admin';
import { Instructor, InstructorDocument } from '../models/Instructor';
import { Student, StudentDocument } from '../models/Student';

 
    
export const findUserByEmail=async(email: string): Promise<AdminDocument | InstructorDocument | StudentDocument | null>  => {
      const admin = await Admin.findOne({ email }).exec();
      if (admin) return admin;
  
      const instructor = await Instructor.findOne({ email }).exec();
      if (instructor) return instructor;
  
      const student = await Student.findOne({ email }).exec();
      if (student) return student;
  
      return null;
    }
                                                                                                               
    export const findUserById=async (id: string): Promise<AdminDocument | InstructorDocument | StudentDocument | null> => {
      const admin = await Admin.findById(id).exec();
      if (admin) return admin;
  
      const instructor = await Instructor.findById(id).exec();
      if (instructor) return instructor;
  
      const student = await Student.findById(id).exec();
      if (student) return student;
  
      return null;
    }


    // export const updateUserRefreshToken = async (userId: string, refreshToken: string): Promise<void> {


      // if( admin) await Admin.findByIdAndUpdate(userId, { refreshToken });
      
  
      // const instructor = await Instructor.findByIdAndUpdate(userId, { refreshToken });
      // if (instructor) return instructor;
  
      // const student = await StudentfindByIdAndUpdate(userId, { refreshToken });
      // if (student) return student;
  
      // return null
  // }


