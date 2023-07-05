import type { Theme } from './theme.types';
import { dark } from './dark';
import { light } from './light';

const theme: Theme = { dark, light };

export type * from './theme.types';
export default theme;
