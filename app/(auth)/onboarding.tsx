import Button from '@/components/ui/Button';
import { BrandColors } from '@/constants/Colors';
import { ClashDisplay } from '@/constants/Typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ONBOARDING_COMPLETED_KEY = '@boostlab_onboarding_completed';

export default function OnboardingScreen() {
  const handleGetFollowers = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      
      // Navigate to main app (tabs)
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Error saving onboarding completion:', error);
      // Continue anyway
      router.replace('/(tabs)');
    }
  };

  const handleSignUp = () => {
    // Navigate to email screen for authentication
    router.push('/(auth)/email');
  };

  return (
    <View style={styles.container}>
      {/* Background Image Container */}
      <ImageBackground 
        source={require('@/assets/images/onboarding/image.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Top gradient overlay for better text contrast */}
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)', 'transparent']}
          style={styles.topGradient}
          pointerEvents="none"
        />
        
        {/* Bottom gradient overlay for content readability */}
        <View style={styles.gradientOverlay} />
        
        {/* Boostlab logo at the top */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/logo/lime-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main content at the bottom */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Get real followers,{'\n'}likes, views, and more</Text>
          <Text style={styles.subtitle}>fast, reliable & secure.</Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Get followers now"
              variant="primary"
              size="medium"
              fullWidth={true}
              onPress={handleGetFollowers}
              buttonStyle={styles.button}
            />
            <Button
              title="Sign up / Log in"
              variant="secondary"
              size="medium"
              fullWidth={true}
              onPress={handleSignUp}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.black,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    zIndex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 160,
    height: 60,
    marginTop: 20,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    zIndex: 2,
  },
  title: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 32,
    color: BrandColors.white,
    marginBottom: 2,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 32,
    color: BrandColors.lime,
    marginBottom: 30,
    lineHeight: 38,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    minHeight: 56,
  },
});