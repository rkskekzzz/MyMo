export class CreateMemoDTO {
  _id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class UpdateMemoDTO {
  _id!: string;
  title!: string;
  content!: string;
  updatedAt!: Date;
}

export class DeleteMemoDTO {
  _id!: string;
  deletedAt!: Date;
}
