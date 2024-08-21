import {Schema,model,Document} from 'mongoose';


export interface ILiveClass extends Document{
    subjectId: string | undefined;
    subjectName: string | undefined ;
    instructorId?: string;
    instructorName: string | undefined;
    date:Date,
    startTime:string,
    endTime:string,
    details:string,
    link:string

}

const liveClassSchema = new Schema<ILiveClass>({
    subjectId:{type:String,required:true},
    subjectName:{type:String,required:true},
    instructorId: { type: String, required: true },
    instructorName: { type: String, required: true },
    date:{type:Date,required:true},
    startTime:{type:String,required:true},
    endTime: { type: String, required: true },
    details: { type: String, required: true },
    link: { type: String, required: true },
    
});
export const LiveClass = model<ILiveClass>('LiveClass',liveClassSchema)