import { BrandColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface SocialModalProps {
  visible: boolean;
  onClose: () => void;
  onSocialSelect: (platform: string) => void;
}

const SocialModal: React.FC<SocialModalProps> = ({
  visible,
  onClose,
  onSocialSelect,
}) => {
  const socialPlatforms = [
    {
      id: 'Instagram',
      name: 'Instagram',
      icon: require('@/assets/images/icons/socials/instagram.png'),
    },
    {
      id: 'TikTok',
      name: 'TikTok',
      icon: require('@/assets/images/icons/socials/tiktok.png'),
    },
    {
      id: 'Twitter',
      name: 'Twitter',
      icon: require('@/assets/images/icons/socials/twitter.png'),
    },
    {
      id: 'YouTube',
      name: 'YouTube',
      icon: require('@/assets/images/icons/socials/youtube.png'),
    },
    {
      id: 'Snapchat',
      name: 'Snapchat',
      icon: require('@/assets/images/icons/socials/snapchat.png'),
    },
    {
      id: 'Facebook',
      name: 'Facebook',
      icon: require('@/assets/images/icons/socials/facebook.png'),
    },
  ];

  const handleSocialPress = (platform: string) => {
    onSocialSelect(platform);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[BrandColors.background, BrandColors.backgroundSecondary]}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Select Platform</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {/* Social Grid */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.grid}>
                {socialPlatforms.map((social) => (
                  <Pressable
                    key={social.id}
                    style={styles.socialItem}
                    onPress={() => handleSocialPress(social.id)}
                  >
                    <View style={styles.socialIconContainer}>
                      <Image source={social.icon} style={styles.socialIcon} />
                    </View>
                    <Text style={styles.socialName}>{social.name}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    maxHeight: '80%',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  gradient: {
    flex: 1,
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ClashDisplay-Medium',
    color: BrandColors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: BrandColors.textPrimary,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  socialItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 32,
  },
  socialIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  socialName: {
    fontSize: 14,
    fontFamily: 'Sora-Medium',
    color: BrandColors.textPrimary,
    textAlign: 'center',
  },
});

export default SocialModal; 