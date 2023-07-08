export type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'background'
  | 'backgroundNote'
  | 'disabled'
  | 'icon';

export type TextColor = 'primary' | 'secondary' | 'disabled' | 'error' | 'success';

export type ColorStyle = {
  [key in Color]: string;
} & {
  text: {
    [key in TextColor]: string;
  };
};
