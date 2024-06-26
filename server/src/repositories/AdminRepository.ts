import {Admin,AdminDocument} from '../models/Admin';
import {Instructor,InstructorDocument} from '../models/Instructor';
import {Student,StudentDocument} from '../models/Student';
import {IUser} from '../interfaces/IUser';

export class adminRepository{
    async createAdmin(adminData:IUser):Promise<AdminDocument>{
        const admin=new Admin(adminData);
        return await admin.save();
    }
    async createInstructor(instructorData:IUser):Promise<InstructorDocument>{
        const instructor = new Instructor(instructorData);
        return await instructor.save();
    }
    async createStudent(studentData:IUser):Promise<StudentDocument>{
        const student = new Student(studentData);
        return await student.save();
    }
}