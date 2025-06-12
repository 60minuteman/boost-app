import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { BrandColors } from '@/constants/Colors';
import { ClashDisplay, Sora } from '@/constants/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Clipboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OTPScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Animation values for loading dots
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Focus first input
    const focusTimer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(focusTimer);
    };
  }, []);

  // Auto-verify when 6 digits are entered
  useEffect(() => {
    const otpCode = otp.join('');
    if (otpCode.length === 6 && !isLoading) {
      handleVerifyOTP();
    }
  }, [otp]);

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

  const getInputState = (index: number) => {
    if (error && otp.join('').length === 6) return 'error';
    if (otp[index] !== '') return 'filled';
    if (focusedIndex === index) return 'active';
    return 'inactive';
  };

  const handlePaste = async (index: number) => {
    try {
      const clipboardData = await Clipboard.getString();
      const digits = clipboardData.replace(/\D/g, '').slice(0, 6);
      
      if (digits.length > 0) {
        const newOtp = ['', '', '', '', '', ''];
        for (let i = 0; i < Math.min(digits.length, 6); i++) {
          newOtp[i] = digits[i];
        }
        setOtp(newOtp);
        
        // Clear error if exists
        if (error) setError('');
        
        // Focus the last filled input or next empty one
        const lastIndex = Math.min(digits.length - 1, 5);
        setTimeout(() => {
          inputRefs.current[lastIndex]?.focus();
          setFocusedIndex(lastIndex);
        }, 100);
      }
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    // Clear error when user starts typing
    if (error) setError('');
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Focus previous input on backspace
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Verifying OTP:', otpCode, 'for email:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate backend response (randomly return new or existing user)
      const isNewUser = Math.random() > 0.5;
      
      console.log(isNewUser ? 'New user detected' : 'Existing user detected');
      
      // Both new and existing users go to home
      router.replace('/(tabs)');
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    try {
      console.log('Resending OTP to:', email);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset timer and clear any errors
      setResendTimer(60);
      setError('');
      setOtp(['', '', '', '', '', '']);
      
      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
        setFocusedIndex(0);
      }, 100);
      
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleBackToEmail = () => {
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
          onPress={handleBackToEmail}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.description}>
              We've sent a 6-digit code to{'\n'}
              <Text style={styles.emailText}>{email}</Text>
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.otpSection}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(ref) => { inputRefs.current[index] = ref; }}
                    variant="otp"
                    state={getInputState(index)}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => handleFocus(index)}
                    onLongPress={() => handlePaste(index)}
                    keyboardType="numeric"
                    maxLength={1}
                    containerStyle={styles.otpInputContainer}
                  />
                ))}
              </View>
              
              {error && (
                <Text style={styles.otpError}>{error}</Text>
              )}
            </View>

            <Button
              title={isLoading ? <LoadingIndicator /> : "Verify & Continue"}
              variant="primary"
              size="medium"
              fullWidth={true}
              onPress={handleVerifyOTP}
              disabled={isLoading}
              buttonStyle={styles.verifyButton}
            />

            <TouchableOpacity 
              style={styles.resendContainer}
              onPress={handleResendOTP}
              disabled={resendTimer > 0}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.resendText,
                resendTimer > 0 && styles.resendDisabled
              ]}>
                {resendTimer > 0 
                  ? `Resend code in ${resendTimer}s`
                  : 'Resend code'
                }
              </Text>
            </TouchableOpacity>
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
    fontSize: 32,
    color: BrandColors.white,
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
  emailText: {
    color: BrandColors.lime,
    fontFamily: Sora.Medium,
  },
  formContainer: {
    gap: 24,
  },
  otpSection: {
    gap: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInputContainer: {
    width: 48,
  },
  otpError: {
    fontFamily: Sora.Regular,
    fontSize: 14,
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  verifyButton: {
    marginTop: 16,
  },
  resendContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  resendText: {
    fontFamily: Sora.Medium,
    fontSize: 16,
    color: BrandColors.lime,
  },
  resendDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
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