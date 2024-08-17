export interface BookUpdate {
  bookName: string;
  subjectId: string | null;
   files?: File[];
}
export interface Book {
  bookName: string;
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
}
