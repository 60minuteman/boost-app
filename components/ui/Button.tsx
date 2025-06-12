import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string | React.ReactElement;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  textStyle,
  buttonStyle,
  ...props
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.baseButton,
      ...styles[`${size}Button`],
      ...(fullWidth && styles.fullWidth),
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.primaryButton };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryButton };
      case 'outline':
        return { ...baseStyle, ...styles.outlineButton };
      default:
        return { ...baseStyle, ...styles.primaryButton };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.baseText,
      ...styles[`${size}Text`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.primaryText };
      case 'secondary':
        return { ...baseStyle, ...styles.secondaryText };
      case 'outline':
        return { ...baseStyle, ...styles.outlineText };
      default:
        return { ...baseStyle, ...styles.primaryText };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), buttonStyle]}
      activeOpacity={0.8}
      {...props}
    >
      {typeof title === 'string' ? (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  baseText: {
    fontFamily: Sora.SemiBold,
    textAlign: 'center',
  },
  
  // Button variants
  primaryButton: {
    backgroundColor: BrandColors.white,
  },
  secondaryButton: {
    backgroundColor: BrandColors.lime,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: BrandColors.white,
  },
  
  // Text variants
  primaryText: {
    color: BrandColors.black,
  },
  secondaryText: {
    color: BrandColors.black,
  },
  outlineText: {
    color: BrandColors.white,
  },
  
  // Sizes
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mediumButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  largeButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 20,
  },
  
  fullWidth: {
    width: '100%',
  },
}); 