import Button from '@/components/ui/Button';
import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

interface HomeHeaderProps {
  isSignedIn?: boolean;
  userName?: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onAuthPress?: () => void; // For sign in/sign up
}

export default function HomeHeader({
  isSignedIn = false,
  userName,
  onMenuPress,
  onNotificationPress,
  onAuthPress,
}: HomeHeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left - Menu Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/header/menu.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Center - Auth Button or Empty Space */}
        <View style={styles.centerContainer}>
          {!isSignedIn && (
            <Button
              title="Log in/ Sign up"
              variant="secondary"
              size="small"
              onPress={onAuthPress}
              buttonStyle={styles.authButton}
              textStyle={styles.authButtonText}
            />
          )}
        </View>

        {/* Right - Notification Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/header/notif.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 60,
    minHeight: Platform.OS === 'android' ? 56 : 60,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Platform.OS === 'android' ? 20 : 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  authButton: {
    backgroundColor: BrandColors.lime,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 140,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  authButtonText: {
    fontFamily: Sora.SemiBold,
    fontSize: 14,
    color: BrandColors.black,
  },
}); 