import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../interfaces/IUser';


const studentSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String},
    course:{type:String},
    role:{type:String,required:true,default:'student'},
    mode:{type:String}

})

export interface StudentDocument extends IUser,Document {}
  export const Student = mongoose.model<StudentDocument>('Student',studentSchema)
