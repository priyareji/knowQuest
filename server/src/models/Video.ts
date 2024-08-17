import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  subjectId: string;
  videoName?: string;
  videoType?: 'youtube' | 'vimeo';
  videoUrl?: string;
  videoSummary?: string;
}

const VideoSchema: Schema = new Schema({
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  videoName: { type: String },
  videoType: { type: String, enum: ['youtube', 'vimeo'] },
  videoUrl: { type: String },
  videoSummary: { type: String },
});

export const Video = mongoose.model<IVideo>('Video', VideoSchema);