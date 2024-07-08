import mongoose,{Document,Schema} from 'mongoose';

export interface IMode extends Document{
modeName:string;

}

const ModeSchema:Schema=new Schema({
    modeName:{type:String,required:true}
});

export const Mode = mongoose.model<IMode>('Mode',ModeSchema)