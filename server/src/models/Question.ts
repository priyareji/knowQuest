import {Schema,model,Document} from 'mongoose';


export interface IQuestions extends Document{
    subjectId: string | undefined;
    subjectName: string | undefined ;
    instructorId?: string;
    instructorName: string | undefined;
  
    questions?:{
      question:string;
      questionType:string;
      mark:number;
    }[];
}

const questionSchema = new Schema<IQuestions>({
    subjectId:{type:String,required:true},
    subjectName:{type:String,required:true},
    instructorId: { type: String, required: true },
    instructorName: { type: String, required: true },
    questions: [{ question: String, questionType:String,mark:Number }],
});
export const Questions = model<IQuestions>('Questions',questionSchema)