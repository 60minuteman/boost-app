import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface ActionCardProps extends TouchableOpacityProps {
  title: string;
  iconName: string; // e.g., 'instagram', 'facebook', etc.
  onPress?: () => void;
}

export default function ActionCard({ title, iconName, onPress, ...props }: ActionCardProps) {
  const getIconSource = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      instagram: require('../../assets/images/icons/socials/instagram.png'),
      facebook: require('../../assets/images/icons/socials/facebook.png'),
      twitter: require('../../assets/images/icons/socials/twitter.png'),
      tiktok: require('../../assets/images/icons/socials/tiktok.png'),
      snapchat: require('../../assets/images/icons/socials/snapchat.png'),
      youtube: require('../../assets/images/icons/socials/youtube.png'),
    };
    
    return iconMap[iconName.toLowerCase()] || iconMap.instagram;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.iconContainer}>
        <Image 
          source={getIconSource(iconName)} 
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(16, 16, 16, 0.45)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#434343',
  },
  iconContainer: {
    marginBottom: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    fontFamily: Sora.Medium,
    fontSize: 14,
    color: BrandColors.white,
    textAlign: 'left',
  },
});