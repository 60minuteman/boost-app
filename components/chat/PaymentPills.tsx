import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PaymentMethod {
  id: string;
  title: string;
  label: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'ngn', title: 'Pay with NGN', label: 'NGN' },
  { id: 'crypto', title: 'Pay with Crypto', label: 'Crypto' },
  { id: 'usd', title: 'Pay with USD Card', label: 'USD Card' },
];

interface PaymentPillsProps {
  selectedPayment: string | null;
  onPaymentSelect: (paymentId: string) => void;
}

export default function PaymentPills({ selectedPayment, onPaymentSelect }: PaymentPillsProps) {
  return (
    <View style={styles.container}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.pill,
            selectedPayment === method.id && styles.selectedPill
          ]}
          onPress={() => onPaymentSelect(method.id)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.pillText,
            selectedPayment === method.id && styles.selectedPillText
          ]}>
            {method.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
  },
  selectedPill: {
    backgroundColor: 'rgba(217, 255, 2, 0.2)',
    borderColor: BrandColors.lime,
  },
  pillText: {
    fontFamily: Sora.Medium,
    fontSize: 14,
    color: BrandColors.white,
  },
  selectedPillText: {
    color: BrandColors.lime,
  },
}); 