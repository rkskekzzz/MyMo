export type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'textPrimary'
  | 'textSecondary'
  | 'textDisabled'
  | 'background'
  | 'disabled';

export type ColorStyle = {
  [key in Color]: string;
};
