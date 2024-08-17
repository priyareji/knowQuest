export interface ChapterUpdate {
  chapterName: string;
  chapterDescription: string;
  subjectId: string | null;
  unitId: string;
  instructorId: string;
  
}

export interface Chapter extends ChapterUpdate {
  _id: string;
  active: boolean;
}
