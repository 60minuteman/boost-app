import ActionGrid from '@/components/home/ActionGrid';
import ActionPills from '@/components/home/ActionPills';
import HomeHeader from '@/components/home/HomeHeader';
import SearchBar from '@/components/home/SearchBar';
import ServiceModal from '@/components/home/ServiceModal';
import { BrandColors } from '@/constants/Colors';
import { ClashDisplay } from '@/constants/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{id: string, title: string, iconName: string} | null>(null);

  useEffect(() => {
    // Listen to keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardActive(true);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardActive(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleAuthPress = () => {
    router.push('/email');
  };

  const handlePlatformPress = (platform: any) => {
    console.log('Platform selected:', platform.title);
    setSelectedPlatform(platform);
    setModalVisible(true);
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleMicPress = () => {
    console.log('Voice search activated');
  };

  const handleSearchFocus = () => {
    setIsKeyboardActive(true);
  };

  const handleSearchBlur = () => {
    setIsKeyboardActive(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPlatform(null);
  };

  const getModalTitle = () => {
    if (!selectedPlatform) return '';
    return selectedPlatform.title;
  };

  const handleServicePress = (service: any) => {
    console.log(`Selected service: ${service.name} for platform: ${selectedPlatform?.title}`);
    // Here you can navigate to the next step or handle service selection
  };

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={Platform.OS === 'android'} 
      />
      
      <View style={[styles.wrapper, { paddingBottom: Platform.OS === 'android' ? insets.bottom : 0 }]}>
        <ImageBackground
          source={require('@/assets/images/home/image.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)', 'transparent']}
            style={styles.topGradient}
            pointerEvents="none"
          />

          <View style={styles.container}>
            <HomeHeader
              isSignedIn={true}
              userName="John"
              onMenuPress={handleMenuPress}
              onNotificationPress={handleNotificationPress}
              onAuthPress={handleAuthPress}
            />

            {/* Fixed Title Section - Only show in default state */}
            {!isKeyboardActive && (
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  Get real followers, likes, views, and more{' '}
                  <Text style={styles.accentText}>fast, reliable & secure.</Text>
                </Text>
              </View>
            )}

            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
              <View style={styles.mainContent}>
                {/* Spacer to push content to bottom */}
                <View style={styles.spacer} />

                {/* Action Components - Switch between Grid and Pills */}
                <View style={[
                  styles.actionContainer,
                  isKeyboardActive && styles.actionContainerKeyboard
                ]}>
                  {isKeyboardActive ? (
                    <ActionPills onPlatformPress={handlePlatformPress} />
                  ) : (
                    <ActionGrid onPlatformPress={handlePlatformPress} />
                  )}
                </View>

                {/* Fixed Search Bar at Bottom */}
                <View style={[
                  styles.searchContainer,
                  isKeyboardActive && styles.searchContainerKeyboard
                ]}>
                  <SearchBar
                    placeholder="Search for anything"
                    onSearchPress={handleSearchPress}
                    onMicPress={handleMicPress}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>

      {/* Bottom Sheet Modal */}
      <ServiceModal
        visible={modalVisible}
        onClose={handleModalClose}
        platformName={selectedPlatform?.title || ''}
        onServicePress={handleServicePress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BrandColors.black,
  },
  background: {
    flex: 1,
    backgroundColor: BrandColors.black,
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacer: {
    flex: 1,
  },
  searchContainer: {
    paddingBottom: Platform.select({
      ios: 40,
      android: 10,
    }),
  },
  searchContainerKeyboard: {
    paddingBottom: Platform.select({
      ios: 20,
      android: 20,
    }),
  },
  actionContainer: {
    marginBottom: 10,
  },
  actionContainerKeyboard: {
    marginBottom: 10,
  },
  mainTitle: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 32,
    color: BrandColors.white,
    lineHeight: 38,
    textAlign: 'left',
  },
  accentText: {
    color: BrandColors.lime,
  },
});
