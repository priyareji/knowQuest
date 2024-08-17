export interface UnitUpdate{
  unitName:string;
  subjectId:string |null;
  instructorId:string;
}
export interface Unit extends UnitUpdate{
  _id:string;
}
