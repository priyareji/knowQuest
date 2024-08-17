import {Schema,model,Document} from 'mongoose';
export interface IQuestion{
    question:string;
    file?:string;
}

export interface IAssignment extends Document{
    subjectId:string;
    subjectName:string;
    assignmentName: string;
    instructorId: string;
    instructorName: string;
    questionType: 'upload-file' | 'custom';
    file?: string;
    questions?: IQuestion[];
}

const assignmentSchema = new Schema<IAssignment>({
    subjectId:{type:String,required:true},
    subjectName:{type:String,required:true},
    assignmentName: { type: String, required: true },
    instructorId: { type: String, required: true },
    instructorName: { type: String, required: true },
    questionType: { type: String, enum: ['upload-file', 'custom'], required: true },
    file: String,
    questions: [{ question: String, file: String }],
});
export const Assignment = model<IAssignment>('Assignment',assignmentSchema)