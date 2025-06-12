import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ActionCard from './ActionCard';

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

interface ActionGridProps {
  onPlatformPress?: (platform: SocialPlatform) => void;
}

export default function ActionGrid({ onPlatformPress }: ActionGridProps) {
  const handlePlatformPress = (platform: SocialPlatform) => {
    if (onPlatformPress) {
      onPlatformPress(platform);
    } else {
      console.log(`Selected platform: ${platform.title}`);
    }
  };

  const renderItem = ({ item }: { item: SocialPlatform }) => (
    <View style={styles.cardContainer}>
      <ActionCard
        title={item.title}
        iconName={item.iconName}
        onPress={() => handlePlatformPress(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={socialPlatforms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    paddingHorizontal: 4,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    flex: 1,
    maxWidth: '48%',
  },
}); 