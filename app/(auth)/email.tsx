import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { BrandColors } from '@/constants/Colors';
import { ClashDisplay, Sora } from '@/constants/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Animation values for loading dots
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Focus the input when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animate loading dots
  useEffect(() => {
    if (isLoading) {
      const animateDots = () => {
        const createAnimation = (animValue: Animated.Value, delay: number) =>
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]);

        Animated.loop(
          Animated.parallel([
            createAnimation(dot1Anim, 0),
            createAnimation(dot2Anim, 200),
            createAnimation(dot3Anim, 400),
          ])
        ).start();
      };

      animateDots();
    } else {
      // Reset animations when not loading
      dot1Anim.setValue(0);
      dot2Anim.setValue(0);
      dot3Anim.setValue(0);
    }
  }, [isLoading]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getInputState = () => {
    if (error) return 'error';
    if (email.trim() !== '') return 'filled';
    return 'inactive';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Sending OTP to:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to OTP screen with email parameter
      router.push({
        pathname: '/(auth)/otp',
        params: { email: email.trim() }
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToOnboarding = () => {
    router.back();
  };

  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <Animated.View 
        style={[
          styles.dot, 
          { 
            transform: [{ 
              translateY: dot1Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -6],
              })
            }]
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { 
            transform: [{ 
              translateY: dot2Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -6],
              })
            }]
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.dot, 
          { 
            transform: [{ 
              translateY: dot3Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -6],
              })
            }]
          }
        ]} 
      />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/image.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={20}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToOnboarding}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.subtitle}>Boostlab</Text>
            <Text style={styles.description}>
              Enter your email to get started with boosting your social media presence
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              ref={inputRef}
              variant="email"
              state={getInputState()}
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={handleSendOTP}
              error={error}
            />

            <Button
              title={isLoading ? <LoadingIndicator /> : "Send OTP"}
              variant="primary"
              size="medium"
              fullWidth={true}
              onPress={handleSendOTP}
              disabled={isLoading}
              buttonStyle={styles.sendButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: BrandColors.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    zIndex: 1,
  },
  container: {
    flex: 1,
    zIndex: 2,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  backText: {
    fontSize: 24,
    color: BrandColors.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 28,
    color: BrandColors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 32,
    color: BrandColors.lime,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: Sora.Regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    gap: 24,
  },
  sendButton: {
    marginTop: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.black,
  },
});