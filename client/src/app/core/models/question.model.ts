export interface questionUpdate {

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
