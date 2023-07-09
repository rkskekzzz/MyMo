export interface Note {
  _id: string;
  title: string;
  content: string;
  isUploaded: boolean;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
