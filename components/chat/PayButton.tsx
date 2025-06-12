import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PayButtonProps {
  amount: string;
  onPayNow: () => void;
  disabled?: boolean;
}

export default function PayButton({ amount, onPayNow, disabled = false }: PayButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.amountText}>Great! The total amount is {amount}</Text>
      
      <TouchableOpacity 
        style={[styles.payButton, disabled && styles.payButtonDisabled]} 
        onPress={disabled ? undefined : onPayNow}
        disabled={disabled}
      >
        <Text style={[styles.payButtonText, disabled && styles.payButtonTextDisabled]}>
          {disabled ? 'Payment confirmed' : 'Tap to pay now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 16,
  },
  amountText: {
    fontFamily: Sora.Regular,
    fontSize: 16,
    color: BrandColors.white,
    lineHeight: 24,
  },
  payButton: {
    backgroundColor: BrandColors.lime,
    borderRadius: 62,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: Sora.SemiBold,
    fontSize: 16,
    color: BrandColors.black,
  },
  payButtonDisabled: {
    backgroundColor: BrandColors.gray,
    opacity: 0.6,
  },
  payButtonTextDisabled: {
    color: BrandColors.white,
  },
}); 