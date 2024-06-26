import mongoose, { Schema, Document, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: Number },
  role: { type: String, required: true, enum: ['admin', 'instructor', 'student'] },
  isAdmin: { type: Boolean },
  course: { type: String },
  batch: { type: String },
  subject: { type: String },
  mode: { type: String },
});

export interface UserDocument extends IUser, Document {}
export const User = model<UserDocument>('User', userSchema);
