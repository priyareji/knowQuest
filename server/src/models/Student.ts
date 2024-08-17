import mongoose,{Document,Schema,Model, Types} from 'mongoose';
import {ISTUDENT} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";
import { UserRolesEnum } from '../types/constants/user-role-enum';

const studentSchema:Schema = new Schema<ISTUDENT>({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String},
    course:{type:String},
    role:{type:String,required:true, default: UserRolesEnum.STUDENT},
    mode:{type:String},
    batch:{type:String},
    refreshToken: { type: String },
    isBlocked:{type:Boolean,required:true,default:false},
    resetToken: { type: String },
    resetTokenExpires: { type: Date },

})
studentSchema.methods.isPasswordCorrect = async function (password: string) {
    return bcrypt.compare(password, this.password);
}
studentSchema.methods.generateAccessToken = async function ():Promise<string> {
    return jwt.sign(
        {
            name: this.name,
            _id: this._id,
            email: this.email,
            // avatar: this.avatar,
            phonenumber:this.phonenumber,
            course:this.course,
            role: this.role,
            batch:this.batch,
            mode:this.mode,
            isBlocked:this.isBlocked
            
        },
        configKey().ACCESS_TOKEN_SECRET,
        {expiresIn:configKey().ACCESS_TOKEN_EXPIRY}
)
}

studentSchema.methods.generateRefreshToken = async function ():Promise<string>{
    return jwt.sign(
        {
            _id:this._id
        },
        configKey().REFRESH_TOKEN_SECRET,
        {expiresIn:configKey().REFRESH_TOKEN_EXPIRY}
    )
}

export interface StudentDocument extends ISTUDENT,Document {
    _id: Types.ObjectId;
  }
// interface IStudentMethods {
//     isPasswordCorrect(password: string): Promise<boolean>;
//     generateAccessToken(): Promise<string>;
//     generateRefreshToken(): Promise<string>;
//   }
  
//   type StudentModel = Model<StudentDocument, {}, IStudentMethods>;
// export type StudentDocument = ISTUDENT & Document;
  
export const Student = mongoose.model<ISTUDENT >('Student',studentSchema)