import { BrandColors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ONBOARDING_COMPLETED_KEY = '@boostlab_onboarding_completed';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Always show onboarding for testing
      router.replace('/(auth)/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo/dark-logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
}); 