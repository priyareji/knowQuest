import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../interfaces/IUser';


const instructorSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'instructor'},
    phonenumber:{type:String},
    course:{type:String},
    mode:{type:String},
    batch:{type:String}
})


export interface InstructorDocument extends IUser,Document{}

export const Instructor = mongoose.model<InstructorDocument>('Instructor',instructorSchema)