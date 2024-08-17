import mongoose, { Document, Schema } from 'mongoose';

export interface ISection {
    sectionName: string;
    sectionDescription?: string;
    chapterId: string;
    unitId: string;
    subjectId: string | null;
    instructorId?: string;
    videoType?: 'youtube' | 'vimeo';
    videoUrl?: string;
    files?: {
      file_url: string;
      file_original_filename: string;
      file_fieldName: string;
      file_path: string;
      file_type: string;
      file_size: string;
      file_name: string;
      file_binary?: string;
    }[];
    active?: boolean;
  }
  const fileSchema = new Schema({
    file_url: { type: String, required: true },
    file_original_filename: { type: String, required: true },
    file_fieldName: { type: String, required: true },
    file_path: { type: String, required: true },
    file_type: { type: String, required: true },
    file_size: { type: String, required: true },
    file_name: { type: String, required: true },
    file_binary: { type: String}
  });
  
  const sectionSchema: Schema = new Schema({
    sectionName: { type: String, required: true },
    sectionDescription: { type: String },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
    videoType: { type: String, enum: ['youtube', 'vimeo'] },
    videoUrl: { type: String },
    files: [fileSchema],
    active: { type: Boolean, default: true }
  });
  export interface SectionDocument extends ISection, Document {}

export const Section = mongoose.model<SectionDocument>('Section', sectionSchema);