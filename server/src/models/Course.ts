import { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  courseName: string;
  description: string;
}

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: true },
});

export const Course = model<ICourse>('Course', courseSchema);
