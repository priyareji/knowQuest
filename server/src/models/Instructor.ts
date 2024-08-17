import mongoose,{Document,Schema, Types,Model} from 'mongoose';
import {IINSTRUCTOR} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";
import { UserRolesEnum } from '../types/constants/user-role-enum';


const instructorSchema:Schema = new Schema<IINSTRUCTOR>({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default: UserRolesEnum.INSTRUCTOR},
    phonenumber:{type:String},
    course:{type:String},
    mode:{type:String},
    batch:{type:String},
    subjects:{type:[String]},
    refreshToken: { type: String },
    isBlocked:{type:Boolean,required:true,default:false},
    resetToken: { type: String },
  resetTokenExpires: { type: Date },
})
instructorSchema.methods.isPasswordCorrect = async function (password: string) {
    return bcrypt.compare(password, this.password);
}
instructorSchema.methods.generateAccessToken = async function ():Promise<string> {
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email,
            role:this.role,
            phonenumber:this.phonenumber,
            course:this.course,
            mode:this.mode,
            batch:this.batch,
            isBlocked:this.isBlocked
            
            
        },
        configKey().ACCESS_TOKEN_SECRET,
        {expiresIn:configKey().ACCESS_TOKEN_EXPIRY}
)
}

instructorSchema.methods.generateRefreshToken = async function ():Promise<string>{
    return jwt.sign(
        {
            _id:this._id
        },
        configKey().REFRESH_TOKEN_SECRET,
        {expiresIn:configKey().REFRESH_TOKEN_EXPIRY}
    )
}


export interface InstructorDocument extends IINSTRUCTOR,Document {
    _id: Types.ObjectId;
  }


// interface IInstructorMethods {
//     isPasswordCorrect(password: string): Promise<boolean>;
//     generateAccessToken(): Promise<string>;
//     generateRefreshToken(): Promise<string>;
//   }
//   type InstructorModel = Model< InstructorDocument, {}, IInstructorMethods>;
// export type InstructorDocument = IINSTRUCTOR & Document;

export const Instructor = mongoose.model<IINSTRUCTOR>('Instructor',instructorSchema)
