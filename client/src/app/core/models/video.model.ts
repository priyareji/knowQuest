export interface VideoUpdate {
  subjectId: string | null;
  videoType?: 'youtube' | 'vimeo';
  videoUrl?: string;
  videoName?: string;
  videoSummary?: string;
}

export interface Video {
  subjectId: string | null;
  videoName?: string;
  videoType?: 'youtube' | 'vimeo';
  videoUrl?: string;
  videoSummary?: string;
}
