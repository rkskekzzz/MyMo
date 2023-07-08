export class CreateNoteDTO {
  _id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class UpdateNoteDTO {
  _id!: string;
  title!: string;
  content!: string;
  updatedAt!: Date;
}

export class DeleteNoteDTO {
  _id!: string;
  deletedAt!: Date;
}
