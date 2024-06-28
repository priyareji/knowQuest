import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";

const studentSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String},
    course:{type:String},
    role:{type:String,required:true,default:'student'},
    mode:{type:String},
    refreshToken: { type: String }

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
            mode:this.mode
            
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

export interface StudentDocument extends IUser,Document,IGenerateTokens {}
  export const Student = mongoose.model<StudentDocument>('Student',studentSchema)