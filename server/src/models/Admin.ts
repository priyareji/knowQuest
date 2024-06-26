import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../interfaces/IUser';

const adminSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'admin'},
})

export interface AdminDocument extends IUser,Document {}

export const Admin = mongoose.model<AdminDocument>('Admin',adminSchema);