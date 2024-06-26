import { IUser } from '../interfaces/IUser';
import {User,UserDocument }from '../models/User';
import { Admin, AdminDocument } from '../models/Admin';
import { Instructor, InstructorDocument } from '../models/Instructor';
import { Student, StudentDocument } from '../models/Student';

export class UserRepository{
    async findAll():Promise<IUser[]>{
        return User.find().exec();
    }
    async findUserByEmail(email: string): Promise<AdminDocument | InstructorDocument | StudentDocument | null> {
      const admin = await Admin.findOne({ email }).exec();
      if (admin) return admin;
  
      const instructor = await Instructor.findOne({ email }).exec();
      if (instructor) return instructor;
  
      const student = await Student.findOne({ email }).exec();
      if (student) return student;
  
      return null;
    }
  
    async findUserById(id: string): Promise<AdminDocument | InstructorDocument | StudentDocument | null> {
      const admin = await Admin.findById(id).exec();
      if (admin) return admin;
  
      const instructor = await Instructor.findById(id).exec();
      if (instructor) return instructor;
  
      const student = await Student.findById(id).exec();
      if (student) return student;
  
      return null;
    }
  async create(user:IUser):Promise<IUser> {
    return User.create(user);
  }
  async update(id:string,user:Partial<IUser>):Promise<IUser | null>{
    return User.findByIdAndUpdate(id,user,{new:true}).exec()
  }
   async delete(id:string):Promise<IUser | null>{
    return User.findByIdAndDelete(id).exec();
   }




}