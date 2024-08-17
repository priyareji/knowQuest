export interface SectionUpdate {
  sectionName: string;
  sectionDescription?: string;
  chapterId: string;
  unitId: string;
  subjectId: string | null;
  instructorId?: string;
  videoType?: 'youtube' | 'vimeo';
  videoUrl?: string;

  files?: File[];
}

export interface Section {
  _id: string;
  sectionName: string;
  sectionDescription?: string;
  chapterId: string;
  unitId: string;
  subjectId: string | null;
  files?: {
    file_url: string;
    file_original_filename: string;
    file_fieldName: string;
    file_path: string;
    file_type: string;
    file_size: string;
    file_name: string;
    file_binary: string;
  }[];
  videoType?: 'youtube' | 'vimeo';
  videoUrl?: string;
  active: boolean;
}
