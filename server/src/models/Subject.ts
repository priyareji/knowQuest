import { Schema, model, Document } from 'mongoose';

export interface ISubject extends Document {
  subjectName: string;
  course: Schema.Types.ObjectId;
  isActive: boolean;
}

const subjectSchema = new Schema({
  subjectName: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isActive: { type: Boolean, default: true },
  
});

export const Subject = model<ISubject>('Subject', subjectSchema);
