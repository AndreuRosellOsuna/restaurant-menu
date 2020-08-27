export const primary = '#63BFBB';
export const secondary = '#A2D6D6';
export const textColor = '#1f2224';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    // tint: tintColorLight,
    tint: primary,
    tabIconDefault: '#ccc',
    // tabIconSelected: tintColorLight,
    tabIconSelected: primary,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
