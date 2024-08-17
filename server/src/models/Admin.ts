import mongoose,{Document,Schema, Types} from 'mongoose';
import {IADMIN} from '../types/model/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKey from "../configs/configkeys";
import { UserRolesEnum } from '../types/constants/user-role-enum';

const adminSchema:Schema = new Schema<IADMIN>({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default: UserRolesEnum.ADMIN},
    refreshToken: { type: String },
    isBlocked:{type:Boolean,requied:true,default:false},
    resetToken: { type: String },
  resetTokenExpires: { type: Date },
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
            isBlocked:this.isBlocked
               
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

export interface AdminDocument extends IADMIN,Document {
    _id: Types.ObjectId;
}

export const Admin = mongoose.model<IADMIN>('Admin',adminSchema);