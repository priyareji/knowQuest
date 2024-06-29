import mongoose,{Document,Schema} from 'mongoose';
import {IUser} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";

const adminSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'admin'},
    refreshToken: { type: String }
})
adminSchema.methods.isPasswordCorrect = async function (password: string) {
    return bcrypt.compare(password, this.password);
}
adminSchema.methods.generateAccessToken = async function ():Promise<string> {
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email,
            role:this.role,
               
        },
        configKey().ACCESS_TOKEN_SECRET,
        {expiresIn:configKey().ACCESS_TOKEN_EXPIRY}
)
}

adminSchema.methods.generateRefreshToken = async function ():Promise<string>{
    return jwt.sign(
        {
            _id:this._id
        },
        configKey().REFRESH_TOKEN_SECRET,
        {expiresIn:configKey().REFRESH_TOKEN_EXPIRY}
    )
}

export interface AdminDocument extends Document,IUser {
    
  }

export const Admin = mongoose.model<AdminDocument>('Admin',adminSchema);