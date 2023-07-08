export type ConflictStatus =
  | 'UpdateConflict'
  | 'DeleteConflictBoth'
  | 'DeleteConflictServer'
  | 'DeleteConflictLocal'
  | 'NoConflict';

export type ConflictStatusWithOrder = {
  conflictStatus: ConflictStatus;
  isLocalUpdatedLatest: boolean;
  isLocalDeletedLatest: boolean;
};
