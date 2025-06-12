import { StyleSheet, Text, type TextProps } from 'react-native';

import { ClashDisplay, Sora } from '@/constants/Typography';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Sora.Regular,
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: Sora.SemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: ClashDisplay.SemiBold,
    fontSize: 20,
    lineHeight: 26,
  },
  link: {
    fontFamily: Sora.Medium,
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
