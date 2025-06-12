import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionPill from './ActionPill';

interface SocialPlatform {
  id: string;
  title: string;
  iconName: string;
}

const socialPlatforms: SocialPlatform[] = [
  { id: '1', title: 'Instagram', iconName: 'instagram' },
  { id: '2', title: 'X (Twitter)', iconName: 'twitter' },
  { id: '3', title: 'Facebook', iconName: 'facebook' },
  { id: '4', title: 'TikTok', iconName: 'tiktok' },
  { id: '5', title: 'Snapchat', iconName: 'snapchat' },
  { id: '6', title: 'Youtube', iconName: 'youtube' },
];

interface ActionPillsProps {
  onPlatformPress?: (platform: SocialPlatform) => void;
}

export default function ActionPills({ onPlatformPress }: ActionPillsProps) {
  const handlePlatformPress = (platform: SocialPlatform) => {
    if (onPlatformPress) {
      onPlatformPress(platform);
    } else {
      console.log(`Selected platform: ${platform.title}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {socialPlatforms.map((platform) => (
          <ActionPill
            key={platform.id}
            title={platform.title}
            iconName={platform.iconName}
            onPress={() => handlePlatformPress(platform)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingRight: 32, // Extra padding for last item
  },
}); 