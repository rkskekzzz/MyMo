export type ConflictStatus =
  | 'NeedUpload'
  | 'UpdateConflict'
  | 'DeleteConflictBoth'
  | 'DeleteConflictServer'
  | 'DeleteConflictLocal'
  | 'NoConflict';
