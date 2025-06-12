import { TypographyStyles } from '@/constants/Typography';
import React from 'react';
import { Text, TextProps } from 'react-native';

type TypographyVariant = keyof typeof TypographyStyles;

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export function Typography({ variant = 'body', style, children, ...props }: TypographyProps) {
  const variantStyle = TypographyStyles[variant];
  
  return (
    <Text 
      style={[variantStyle, style]} 
      {...props}
    >
      {children}
    </Text>
  );
}

// Convenience components for common use cases

export function Heading1({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h1" style={style} {...props}>{children}</Typography>;
}

export function Heading2({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h2" style={style} {...props}>{children}</Typography>;
}

export function Heading3({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h3" style={style} {...props}>{children}</Typography>;
}

export function Heading4({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h4" style={style} {...props}>{children}</Typography>;
}

export function Heading5({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h5" style={style} {...props}>{children}</Typography>;
}

export function Heading6({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h6" style={style} {...props}>{children}</Typography>;
}

export function BodyText({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="body" style={style} {...props}>{children}</Typography>;
}

export function BodyLarge({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="bodyLarge" style={style} {...props}>{children}</Typography>;
}

export function BodySmall({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="bodySmall" style={style} {...props}>{children}</Typography>;
}

export function Subtitle({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="subtitle" style={style} {...props}>{children}</Typography>;
}

export function Caption({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="caption" style={style} {...props}>{children}</Typography>;
}

export function ButtonText({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="button" style={style} {...props}>{children}</Typography>;
}

export function Logo({ style, children, ...props }: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="logo" style={style} {...props}>{children}</Typography>;
}

// Font family shortcuts for custom styling
export { ClashDisplay, Sora } from '@/constants/Typography';
