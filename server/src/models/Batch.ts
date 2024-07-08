import mongoose,{Schema,Document} from 'mongoose';

export interface IBatch extends Document{
    batchName:string;
    mode:mongoose.Types.ObjectId;
}
const batchSchema:Schema = new Schema({
    batchName:{type:String,required:true},
    mode:{type:mongoose.Schema.Types.ObjectId,ref:'Mode',required:true}
});
export const Batch = mongoose.model<IBatch>('Batch',batchSchema);