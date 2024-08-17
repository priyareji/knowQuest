import mongoose,{Document,Schema} from 'mongoose';

export interface IUnit extends Document{
    _id: string;
    unitName: string;
    subjectId: string | null;
    instructorId: string;

}

const UnitSchema:Schema=new Schema({
    unitName:{type:String,required:true},
    subjectId:{type:String,required:true},
    instructorId:{type:String},
});

export const Unit = mongoose.model<IUnit>('Unit',UnitSchema)