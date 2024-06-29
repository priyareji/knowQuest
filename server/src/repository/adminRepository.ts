import {Admin,AdminDocument} from '../models/Admin';
import {Instructor,InstructorDocument} from '../models/Instructor';
import {Student,StudentDocument} from '../models/Student';
import {IUser} from '../types/model/IUser.interface';


    export const createAdmin = async(adminData:IUser):Promise<AdminDocument> =>{
        const admin=new Admin(adminData);
        return await admin.save();
    }
    export const  createInstructor = async (instructorData:IUser):Promise<InstructorDocument> =>{
        const instructor = new Instructor(instructorData);
        return await instructor.save();
    }
    export const createStudent = async(studentData:IUser):Promise<StudentDocument> =>{
        const student = new Student(studentData);
        return await student.save();
    }
