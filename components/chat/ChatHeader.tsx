import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatHeaderProps {
  title: string;
  platformName: string;
  onClose: () => void;
}

export default function ChatHeader({ title, platformName, onClose }: ChatHeaderProps) {
  const insets = useSafeAreaInsets();

  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'instagram':
        return require('../../assets/images/icons/socials/instagram.png');
      case 'x (twitter)':
      case 'twitter':
        return require('../../assets/images/icons/socials/twitter.png');
      case 'facebook':
        return require('../../assets/images/icons/socials/facebook.png');
      case 'tiktok':
        return require('../../assets/images/icons/socials/tiktok.png');
      case 'snapchat':
        return require('../../assets/images/icons/socials/snapchat.png');
      case 'youtube':
        return require('../../assets/images/icons/socials/youtube.png');
      default:
        return require('../../assets/images/icons/socials/instagram.png');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image 
            source={getSocialIcon(platformName)} 
            style={styles.socialIcon}
            resizeMode="contain"
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(28, 28, 28, 0.85)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(75, 75, 75, 0.35)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 52,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontFamily: Sora.SemiBold,
    fontSize: 16,
    color: BrandColors.white,
    textAlign: 'left',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: BrandColors.white,
    fontWeight: '400',
    lineHeight: 20,
  },
}); 