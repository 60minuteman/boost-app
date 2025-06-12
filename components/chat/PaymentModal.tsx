import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
    Alert,
    Clipboard,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BankDetails from './BankDetails';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
  paymentMethod: string;
  amount: string;
  quantity: number;
  platformName: string;
  serviceName: string;
}

const { height: screenHeight } = Dimensions.get('window');

export default function PaymentModal({ 
  visible, 
  onClose, 
  onPaymentConfirmed, 
  paymentMethod, 
  amount, 
  quantity,
  platformName,
  serviceName 
}: PaymentModalProps) {
  
  const getSocialIcon = () => {
    const platform = platformName.toLowerCase();
    switch (platform) {
      case 'instagram':
        return require('@/assets/images/icons/socials/select/instagram.png');
      case 'tiktok':
        return require('@/assets/images/icons/socials/select/tiktok.png');
      case 'twitter':
      case 'x':
        return require('@/assets/images/icons/socials/select/twitter.png');
      case 'youtube':
        return require('@/assets/images/icons/socials/select/youtube.png');
      case 'facebook':
        return require('@/assets/images/icons/socials/select/facebook.png');
      default:
        return require('@/assets/images/icons/socials/select/instagram.png'); // fallback
    }
  };
  
  const getPaymentDetails = () => {
    if (paymentMethod === 'crypto') {
      return {
        title: `${quantity} ${platformName} ${serviceName}`,
        walletAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', // USDT TRC20 address
        walletLabel: 'USDT (TRC20) Address',
      };
    } else if (paymentMethod === 'ngn') {
      return {
        title: `${quantity} ${platformName} ${serviceName}`,
        bankDetails: {
          bankName: 'Paystack-Titan',
          accountName: 'Barbie Followers',
          accountNumber: '3089415578',
        },
      };
    }
    return null;
  };

  const paymentDetails = getPaymentDetails();

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  if (!paymentDetails) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image 
                source={getSocialIcon()}
                style={styles.platformIcon}
              />
              <Text style={styles.headerTitle}>{paymentDetails.title}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quantity</Text>
              <Text style={styles.detailValue}>{quantity}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>{amount}</Text>
            </View>

            <Text style={styles.instructions}>Send the exact amount to the account details below</Text>

            {paymentMethod === 'crypto' && (
              <View style={styles.paymentInfoCard}>
                <Text style={styles.paymentInfoLabel}>{paymentDetails.walletLabel}</Text>
                <TouchableOpacity 
                  style={styles.copyableRow}
                  onPress={() => copyToClipboard(paymentDetails.walletAddress!, 'Wallet address')}
                >
                  <Text style={styles.paymentInfoValue}>{paymentDetails.walletAddress}</Text>
                  <Text style={styles.copyIcon}>📋</Text>
                </TouchableOpacity>
              </View>
            )}

            {paymentMethod === 'ngn' && (
              <BankDetails 
                bankName={paymentDetails?.bankDetails?.bankName}
                accountName={paymentDetails?.bankDetails?.accountName}
                accountNumber={paymentDetails?.bankDetails?.accountNumber}
              />
            )}
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={onPaymentConfirmed}>
            <Text style={styles.confirmButtonText}>I have made payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: BrandColors.black,
    borderRadius: 40,
    paddingBottom: 40,
    maxHeight: screenHeight * 0.8,
    margin: 8,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: Sora.SemiBold,
    fontSize: 18,
    color: BrandColors.white,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: BrandColors.white,
  },
  content: {
    paddingHorizontal: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailLabel: {
    fontFamily: Sora.Regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailValue: {
    fontFamily: Sora.SemiBold,
    fontSize: 18,
    color: BrandColors.white,
  },
  instructions: {
    fontFamily: Sora.Regular,
    fontSize: 14,
    color: BrandColors.lime,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 20,
  },
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
  confirmButton: {
    backgroundColor: BrandColors.lime,
    borderRadius: 40,
    paddingVertical: 16,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: Sora.SemiBold,
    fontSize: 16,
    color: BrandColors.black,
  },
}); 