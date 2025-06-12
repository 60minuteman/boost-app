import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React, { forwardRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'email' | 'otp';
  state?: 'inactive' | 'active' | 'filled' | 'error';
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  onLongPress?: () => void;
}

const Input = forwardRef<TextInput, InputProps>(({
  variant = 'email',
  state = 'inactive',
  label,
  error,
  containerStyle,
  labelStyle,
  style,
  onLongPress,
  ...props
}, ref) => {
  const getInputStyle = () => {
    const baseStyle = [styles.baseInput];
    
    // Variant styles
    if (variant === 'email') {
      baseStyle.push(styles.emailInput);
    } else if (variant === 'otp') {
      baseStyle.push(styles.otpInput);
    }
    
    // State styles
    switch (state) {
      case 'active':
        baseStyle.push(styles.activeInput);
        break;
      case 'filled':
        baseStyle.push(styles.filledInput);
        break;
      case 'error':
        baseStyle.push(styles.errorInput);
        break;
      default:
        baseStyle.push(styles.inactiveInput);
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <TextInput
        ref={ref}
        style={[getInputStyle(), style]}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        onLongPress={onLongPress}
        {...props}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: Sora.Medium,
    fontSize: 16,
    color: BrandColors.white,
    marginBottom: 8,
  },
  baseInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    fontSize: 16,
    color: BrandColors.white,
    fontFamily: Sora.Regular,
    borderWidth: 1,
  },
  
  // Variant styles
  emailInput: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'left',
  },
  otpInput: {
    width: 48,
    height: 56,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Sora.SemiBold,
  },
  
  // State styles
  inactiveInput: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeInput: {
    borderColor: BrandColors.lime,
    backgroundColor: 'rgba(217, 255, 2, 0.05)',
  },
  filledInput: {
    borderColor: BrandColors.lime,
    backgroundColor: 'rgba(217, 255, 2, 0.1)',
  },
  errorInput: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  
  errorText: {
    fontFamily: Sora.Regular,
    fontSize: 14,
    color: '#FF4444',
    marginTop: 6,
    marginLeft: 4,
  },
});

export default Input; 