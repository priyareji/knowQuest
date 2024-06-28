import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";


const instructorSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'instructor'},
    phonenumber:{type:String},
    course:{type:String},
    mode:{type:String},
    batch:{type:String},
    refreshToken: { type: String }
})
instructorSchema.methods.isPasswordCorrect = async function (password: string) {
    return bcrypt.compare(password, this.password);
}
instructorSchema.methods.generateAccessToken = async function ():Promise<string> {
    return jwt.sign(
        {
            name:this.name,
            email:this.email,
            role:this.role,
            phonenumber:this.phonenumber,
            course:this.course,
            mode:this.mode,
            batch:this.mode,
            
            
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


export interface InstructorDocument extends IUser,Document,IGenerateTokens{}

export const Instructor = mongoose.model<InstructorDocument>('Instructor',instructorSchema)