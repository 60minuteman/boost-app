/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Boostlab brand colors with bright lime green primary color.
 */

const brandLime = '#D9FF02'; // Bright lime green from splash screen
const brandLimeDark = '#9FE000'; // Slightly darker variant
const brandDark = '#000000'; // Pure black for text contrast
const brandGray = '#666666'; // Medium gray for secondary text

export const Colors = {
  light: {
    text: brandDark,
    background: '#FFFFFF',
    tint: brandLime,
    icon: brandGray,
    tabIconDefault: brandGray,
    tabIconSelected: brandLime,
    primary: brandLime,
    secondary: brandGray,
    accent: brandLimeDark,
    surface: '#F8F9FA',
    border: '#E5E5E5',
  },
  dark: {
    text: '#FFFFFF',
    background: brandDark,
    tint: brandLime,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: brandLime,
    primary: brandLime,
    secondary: '#CCCCCC',
    accent: brandLimeDark,
    surface: '#1A1A1A',
    border: '#333333',
  },
};

// Brand colors that can be used directly
export const BrandColors = {
  lime: brandLime,
  limeDark: brandLimeDark,
  black: brandDark,
  white: '#FFFFFF',
  gray: brandGray,
};
