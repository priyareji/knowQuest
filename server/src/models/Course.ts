import { required } from 'joi';
import mongoose, { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  courseName: string;
  description: string;
  subject:mongoose.Types.ObjectId[];
}

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: true },
  subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

export const Course = model<ICourse>('Course', courseSchema);
