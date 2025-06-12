import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface QuantityPillsProps {
  quantities: number[];
  selectedQuantity: number | null;
  onQuantitySelect: (quantity: number) => void;
}

export default function QuantityPills({ quantities, selectedQuantity, onQuantitySelect }: QuantityPillsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pillsWrapper}>
        {quantities.map((quantity) => (
          <TouchableOpacity
            key={quantity}
            style={[
              styles.pill,
              selectedQuantity === quantity && styles.selectedPill
            ]}
            onPress={() => onQuantitySelect(quantity)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.pillText,
              selectedQuantity === quantity && styles.selectedPillText
            ]}>
              {quantity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.noteText}>
        You can enter the amount you need in the chat if it is not included here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pillsWrapper: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  pill: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  selectedPill: {
    backgroundColor: BrandColors.lime,
    borderColor: BrandColors.lime,
  },
  pillText: {
    fontFamily: Sora.SemiBold,
    fontSize: 14,
    color: BrandColors.white,
  },
  selectedPillText: {
    color: BrandColors.black,
  },
  noteText: {
    fontFamily: Sora.Regular,
    fontSize: 12,
    color: BrandColors.lime,
    lineHeight: 16,
  },
}); 