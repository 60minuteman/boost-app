import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
    Alert,
    Clipboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface BankDetailsProps {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}

export default function BankDetails({ 
  bankName = 'Paystack-Titan',
  accountName = 'Barbie Followers',
  accountNumber = '3089415578'
}: BankDetailsProps) {
  
  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  return (
    <View style={styles.paymentInfoCard}>
      <View style={styles.bankDetailRow}>
        <Text style={styles.paymentInfoLabel}>Bank Name</Text>
        <Text style={styles.paymentInfoValue}>{bankName}</Text>
      </View>
      
      <View style={styles.bankDetailRow}>
        <Text style={styles.paymentInfoLabel}>Account Name</Text>
        <Text style={styles.paymentInfoValue}>{accountName}</Text>
      </View>
      
      <View style={[styles.bankDetailRow, { marginBottom: 0 }]}>
        <Text style={styles.paymentInfoLabel}>Account Number</Text>
        <TouchableOpacity 
          style={styles.copyableRow}
          onPress={() => copyToClipboard(accountNumber, 'Account number')}
        >
          <Text style={styles.paymentInfoValue}>{accountNumber}</Text>
          <Text style={styles.copyIcon}>📋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  paymentInfoLabel: {
    fontFamily: Sora.Regular,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  paymentInfoValue: {
    fontFamily: Sora.SemiBold,
    fontSize: 16,
    color: BrandColors.white,
    flex: 1,
    lineHeight: 22,
  },
  copyableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyIcon: {
    fontSize: 20,
    color: BrandColors.lime,
  },
  bankDetailRow: {
    marginBottom: 20,
  },
}); 