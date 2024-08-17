export interface AssignmentUpdate {
  assignmentName: string;
  subjectId: string;
  subjectName: string;
  instructorId?: string;
  instructorName: string | undefined;
  questionType: 'upload-file' | 'custom';
 //batchId?: string;
  questions?: {question: string, file: File}[];
  file?: File | any;

}

export interface Assignment extends AssignmentUpdate {
  _id: string;
  createdAt: Date;
  students: [];
}
