export class CreateNoteDTO {
  _id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}

export class UpdateNoteDTO {
  _id!: string;
  title!: string;
  content!: string;
  updatedAt!: Date;
  deletedAt!: Date | null;
}

export class DeleteNoteDTO {
  _id!: string;
  deletedAt!: Date;
}
