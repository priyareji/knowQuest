import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document{
    chapterName: string;
    chapterDescription: string;
    subjectId: string;
    unitId: string;
    instructorId?: string;
    active?: boolean;
  }
  
  const chapterSchema: Schema = new Schema({
    chapterName: { type: String, required: true },
    chapterDescription: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    instructorId: { type:String, ref: 'Instructor', },
    active: { type: Boolean }
  })
  export const Chapter = mongoose.model<IChapter>('Chapter', chapterSchema);