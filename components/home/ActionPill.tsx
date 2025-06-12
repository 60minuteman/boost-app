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

interface ActionPillProps extends TouchableOpacityProps {
  title: string;
  iconName: string;
  onPress?: () => void;
}

export default function ActionPill({ title, iconName, onPress, ...props }: ActionPillProps) {
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
      style={styles.pill} 
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
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 120,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontFamily: Sora.Medium,
    fontSize: 14,
    color: BrandColors.white,
    flexShrink: 1,
  },
}); 