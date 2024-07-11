import {Admin,AdminDocument} from '../models/Admin';
import { Batch, IBatch } from '../models/Batch';
import { Course, ICourse  } from '../models/Course';
import {Instructor,InstructorDocument} from '../models/Instructor';
import { IMode, Mode } from '../models/Mode';
import {Student,StudentDocument} from '../models/Student';
import { Subject,ISubject } from '../models/Subject';
import {IUser} from '../types/model/IUser.interface';

export class AdminRepository {
     async  createAdmin (adminData:IUser):Promise<AdminDocument>{
        const admin=new Admin(adminData);
        return await admin.save();
    }
     async   createInstructor  (instructorData:IUser):Promise<InstructorDocument>{
        const instructor = new Instructor(instructorData);
        return await instructor.save();
    }
     async  createStudent (studentData:IUser):Promise<StudentDocument>{
        const student = new Student(studentData);
        return await student.save();
    }

     async  getAllinstructors (): Promise<InstructorDocument[]>{
        return await Instructor.find({})
      }
       async  getAllstudents (): Promise<StudentDocument[]>{
        return await Student.find({})
      }
       async  findAdminById (id:string):Promise<AdminDocument | null>  {
        console.log(`Finding instructor with ID: ${id}`)
            return await Admin.findById(id)
            
      }
       async  findInstructorById (id:string):Promise<InstructorDocument | null>  {
        console.log(`Finding instructor with ID: ${id}`)
            return await Instructor.findById(id)
            
      }
       async  findStudentById (id:string):Promise<StudentDocument | null>  {
        return await Student.findById(id)
  }
   async  adminfindByIdAndUpdate(id: string, update: object): Promise<any>   {
    return Admin.findByIdAndUpdate(id, update, { new: true });
  }
  async createMode(modeData: Partial<IMode>): Promise<IMode> {
    const mode = new Mode(modeData);
    return await mode.save();
  }

  async getAllModes(): Promise<IMode[]> {
    return await Mode.find();
  }

  async getModeById(id: string): Promise<IMode | null> {
    return await Mode.findById(id);
  }

  async deleteMode(id: string): Promise<IMode | null> {
    return await Mode.findByIdAndDelete(id);
  }
  async CreateBatch(batchName:string,modeId:string):Promise<IBatch>{
    try{
      const batch = new Batch({batchName,mode:modeId});
      return await batch.save();
    }catch(error){
      throw new Error('Error creating batch: '+  (error as Error).message)
    }
  }
async getAllBatches():Promise<IBatch[]>{
  try{
    return await Batch.find().populate('mode').exec();

  }catch(error){
    throw new Error('Error fetching batches: ' + (error as Error).message)
  }
}

async getBatchById(id:string):Promise<IBatch | null>{
  try{
    return await Batch.findById(id).populate('mode').exec();

  }
  catch(error){
    throw new Error('Error fetching batches: ' + (error as Error).message)
  }
}
 async deleteBatch(id:string):Promise<IBatch | null>{
  try{
    return await Batch.findByIdAndDelete(id).exec();
  }catch(error){
    throw new Error('Error deleting batch: ' + (error as Error).message)
  }
 }
 async createCourse(courseName: string, description: string): Promise<ICourse> {
  try {
    const course = new Course({ courseName, description });
    return await course.save();
  } catch (error) {
    throw new Error('Error creating course: ' + (error as Error).message);
  }
}

async getCourses(): Promise<ICourse[]> {
  try {
    return await Course.find();
  } catch (error) {
    throw new Error('Error fetching courses: ' + (error as Error).message);
  }
}

async deleteCourse(courseId: string): Promise<void> {
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error('Error deleting course: ' + (error as Error).message);
  }

}
async createSubject(subjectName: string, courseId: string): Promise<ISubject> {
  try {
    const subject = new Subject({ subjectName, course: courseId });
    
    return await subject.save();
  } catch (error) {
    throw new Error('Error creating subject: ' + (error as Error).message);
  }
}

async getSubjects(): Promise<ISubject[]> {
  try {
    return await Subject.find().populate('course');
  } catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
}

async deleteSubject(subjectId: string): Promise<void> {
  try {
    await Subject.findByIdAndDelete(subjectId);
  } catch (error) {
    throw new Error('Error deleting subject: ' + (error as Error).message);
  }
}
async updateSubjectStatus(subjectId: string, isActive: boolean): Promise<ISubject | null> {
  try {
    return await Subject.findByIdAndUpdate(subjectId, { isActive }, { new: true });
  } catch (error) {
    throw new Error('Error updating subject status: ' + (error as Error).message);
  }
}


}