import mongoose, { Document, Schema } from 'mongoose';

const fileSchema = new Schema({
  file_url: { type: String, required: true },
  file_original_filename: { type: String, required: true },
  file_fieldName: { type: String, required: true },
  file_path: { type: String, required: true },
  file_type: { type: String, required: true },
  file_size: { type: String, required: true },
  file_name: { type: String, required: true },
  file_binary: { type: String }
});

const bookSchema: Schema = new Schema({
  bookName: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  files: [fileSchema]
});

export interface BookDocument extends Document {
  bookName: string;
  subjectId: mongoose.Types.ObjectId;
  files: {
    file_url: string;
    file_original_filename: string;
    file_fieldName: string;
    file_path: string;
    file_type: string;
    file_size: string;
    file_name: string;
    file_binary?: string;
  }[];
}

export const Book = mongoose.model<BookDocument>('Book', bookSchema);