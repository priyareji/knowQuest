import { ObjectId } from 'mongoose';
import {Admin,AdminDocument} from '../models/Admin';
import { Batch, IBatch } from '../models/Batch';
import { Course, ICourse  } from '../models/Course';
import {Instructor,InstructorDocument} from '../models/Instructor';
import { IMode, Mode } from '../models/Mode';
import {Student,StudentDocument} from '../models/Student';
import { Subject,ISubject } from '../models/Subject';
import {IADMIN, IINSTRUCTOR, ISTUDENT} from '../types/model/IUser.interface';

export class AdminRepository {
     async  createAdmin (adminData:IADMIN):Promise<AdminDocument>{
        const admin=new Admin(adminData);
        return await admin.save();
    }
     async   createInstructor  (instructorData:IINSTRUCTOR):Promise<InstructorDocument>{
        const instructor = new Instructor(instructorData);
        return await instructor.save();
    }
     async  createStudent (studentData:ISTUDENT):Promise<StudentDocument>{
        const student = new Student(studentData);
        return await student.save();
    }

    async findInstructorByEmail (email:string):Promise<InstructorDocument | null >{
      return await Instructor.findOne({email})
    }
    async findStudentByEmail (email:string):Promise<StudentDocument | null>{
      return await Student.findOne({email})
    }
    async updateInstructorPassword(id:string,password:string):Promise<void>{
      await Instructor.findByIdAndUpdate(id,{password})
    }
    async saveInstructorResetToken(id:string,resetToken:string):Promise<void>{
      await Instructor.findByIdAndUpdate(id,{resetToken})
    }

    async updateStudentPassword(id:string,password:string):Promise<void>{
      await Student.findByIdAndUpdate(id,{password})
    }

    async saveStudentResetToken(id:string,resetToken:string):Promise<void>{
      await Student.findByIdAndUpdate(id,{resetToken})
    }

    async findInstructorByResetToken(token: string): Promise<InstructorDocument | null> {
      return await Instructor.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() }, 
      });
    }
    async findStudentByResetToken(token: string): Promise<StudentDocument | null> {
      return await Student.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() }, 
      });
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
  async CreateBatch(batchName:string,modeId:string,courseId: string):Promise<IBatch>{
    try{
      const batch = new Batch({batchName,mode:modeId,course: courseId});
      return await batch.save();
    }catch(error){
      throw new Error('Error creating batch: '+  (error as Error).message)
    }
  }
  async findModeByModeName(modeName:string):Promise<IMode[] | null>{
    try{
      let modeData=await Mode.findOne({modeName:modeName}).exec()
      if(modeData) return [modeData as IMode]
      else return null
    }
    catch (error) {
      throw new Error('Error fetching subjects: ' + (error as Error).message);
    }
  }
async getAllBatches():Promise<IBatch[]>{
  try{
    return await Batch.find().populate('mode').exec();

  }catch(error){
    throw new Error('Error fetching batches: ' + (error as Error).message)
  }
}
async getCourseById(id:string):Promise<ICourse | null>{
  try{
    return await Course.findById(id).exec();

  }
  catch(error){
    throw new Error('Error fetching courses: ' + (error as Error).message)
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
 async findBatchByBatchName(batchName:string):Promise<IBatch[] | null>{
  try{
    let batchData=await Batch.findOne({batchName:batchName})
    if(batchData) return [batchData as IBatch]
    else return null
  }catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
 }
 async createCourse(courseName: string, description: string,subjectIds:string[]): Promise<ICourse> {
  try {
    const course = new Course({ courseName, description,subject:subjectIds });
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
async findCourseByName(courseName:string): Promise<ICourse[] | null>{
  try{
    let courseData=await Course.findOne({courseName:courseName}).exec();
    if(courseData) return [courseData as ICourse];
    else return null;
  }catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
}
async deleteCourse(courseId: string): Promise<void> {
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error('Error deleting course: ' + (error as Error).message);
  }

}
async createSubject(subjectName: string): Promise<ISubject> {
  try {
    const subject = new Subject({ subjectName});
    
    return await subject.save();
  } catch (error) {
    throw new Error('Error creating subject: ' + (error as Error).message);
  }
}

async getSubjects(): Promise<ISubject[]> {
  try {
    return await Subject.find()
  } catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
}

async findSubjectByName(subjectName: string): Promise<ISubject[] | null> {
  try {
    let subjectData = await Subject.findOne({ subjectName: subjectName }).exec();
    
    if (subjectData) return [subjectData as ISubject];
    else return null;
  } catch (error) {
    throw new Error('Error fetching subjects: ' + (error as Error).message);
  }
}
async getSubject(subjectId: string): Promise<ISubject[] | null> {
  try {
    let subjectData  = await Subject.findOne({_id:subjectId});
    console.log(subjectData,"repSubject")
    if (subjectData) return [subjectData as ISubject];
    else return null;
  } catch (error) {
    throw new Error('Error deleting subject: ' + (error as Error).message);
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
async blockInstuctorById(id:string){
  try{
    return await Instructor.findByIdAndUpdate(id,{isBlocked:true},{new:true})
  }
  catch(error){
    throw new Error('Error blocking Instructor: '+ (error as Error).message)
  }
}
async unblockInstuctorById(id:string){
  try{
    return await Instructor.findByIdAndUpdate(id,{isBlocked:false},{new:true})
  }
  catch(error){
    throw new Error('Error blocking Instructor: '+ (error as Error).message)
  }
}
async blockStudentById(id:string){
  try{
    return await Student.findByIdAndUpdate(id,{isBlocked:true},{new:true})
  }
  catch(error){
    throw new Error('Error blocking Student: '+(error as Error).message)
  }
}

async unblockStudentById(id:string){
  try{
    return await Student.findByIdAndUpdate(id,{isBlocked:false},{new:true})
  }
  catch(error){
    throw new Error('Error blocking Student: '+(error as Error).message)
  }
}

}