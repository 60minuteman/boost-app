/**
 * Typography constants for Boostlab app
 * 
 * Header Fonts: ClashDisplay (Custom)
 * Body Fonts: Sora (Google Fonts)
 */

// ClashDisplay font family mappings
export const ClashDisplay = {
  ExtraLight: 'ClashDisplay-Extralight',
  Light: 'ClashDisplay-Light', 
  Regular: 'ClashDisplay-Regular',
  Medium: 'ClashDisplay-Medium',
  SemiBold: 'ClashDisplay-Semibold',
  Bold: 'ClashDisplay-Bold',
} as const;

// Sora font family mappings (Google Fonts)
export const Sora = {
  ExtraLight: 'Sora_200ExtraLight',
  Light: 'Sora_300Light',
  Regular: 'Sora_400Regular',
  Medium: 'Sora_500Medium',
  SemiBold: 'Sora_600SemiBold',
  Bold: 'Sora_700Bold',
  ExtraBold: 'Sora_800ExtraBold',
} as const;

// Font size scale
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
} as const;

// Line height scale
export const LineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Typography styles for consistent usage
export const TypographyStyles = {
  // Headers (ClashDisplay)
  h1: {
    fontFamily: ClashDisplay.Bold,
    fontSize: FontSizes['5xl'],
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
  },
  h2: {
    fontFamily: ClashDisplay.Bold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
  },
  h3: {
    fontFamily: ClashDisplay.SemiBold,
    fontSize: FontSizes['3xl'],
    lineHeight: FontSizes['3xl'] * LineHeights.snug,
  },
  h4: {
    fontFamily: ClashDisplay.SemiBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.snug,
  },
  h5: {
    fontFamily: ClashDisplay.Medium,
    fontSize: FontSizes.xl,
    lineHeight: FontSizes.xl * LineHeights.normal,
  },
  h6: {
    fontFamily: ClashDisplay.Medium,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  
  // Body text (Sora)
  body: {
    fontFamily: Sora.Regular,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  bodyLarge: {
    fontFamily: Sora.Regular,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  bodySmall: {
    fontFamily: Sora.Regular,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  
  // Special variants
  subtitle: {
    fontFamily: Sora.Medium,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  caption: {
    fontFamily: Sora.Regular,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  button: {
    fontFamily: Sora.SemiBold,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.none,
  },
  
  // Logo/Brand
  logo: {
    fontFamily: ClashDisplay.Bold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * LineHeights.none,
    letterSpacing: -1,
  },
} as const;

export type FontFamily = typeof ClashDisplay[keyof typeof ClashDisplay] | typeof Sora[keyof typeof Sora];
export type FontSize = typeof FontSizes[keyof typeof FontSizes];
export type LineHeight = typeof LineHeights[keyof typeof LineHeights]; 