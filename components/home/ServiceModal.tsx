import { BrandColors } from '@/constants/Colors';
import { Service, getServicesForPlatform } from '@/constants/Services';
import { ClashDisplay, Sora } from '@/constants/Typography';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ServiceModalProps {
  visible: boolean;
  onClose: () => void;
  platformName: string;
  onServicePress: (service: Service) => void;
}

const { height: screenHeight } = Dimensions.get('window');

export default function ServiceModal({ visible, onClose, platformName, onServicePress }: ServiceModalProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const translateY = new Animated.Value(screenHeight);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'followers':
        return require('../../assets/images/icons/socials/select/followers.png');
      case 'likes':
        return require('../../assets/images/icons/socials/select/likes.png');
      case 'comments':
        return require('../../assets/images/icons/socials/select/comments.png');
      case 'views':
        return require('../../assets/images/icons/socials/select/views.png');
      default:
        return require('../../assets/images/icons/socials/select/followers.png');
    }
  };

  const handleServicePress = (service: Service) => {
    onServicePress(service);
    onClose();
    router.push({
      pathname: '/chat',
      params: {
        platform: platformName,
        service: service.name,
      },
    });
  };

  const services = getServicesForPlatform(platformName);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <TouchableOpacity 
          style={styles.backdropTouchable} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
              paddingBottom: insets.bottom + 16,
            }
          ]}
        >
          {/* Handle Bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{platformName}</Text>
          </View>

          {/* Service List */}
          <View style={styles.content}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={getServiceIcon(service.iconName)}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 34, 8, 0.85)',
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: BrandColors.black,
    borderRadius: 40,
    marginHorizontal: 8,
    marginBottom: 12,
    maxHeight: screenHeight * 0.8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: ClashDisplay.Bold,
    fontSize: 24,
    color: BrandColors.white,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
    minHeight: 70,
  },
  iconContainer: {
    width: 44,
    height: 44,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  icon: {
    width: 26,
    height: 26,
  },
  serviceName: {
    flex: 1,
    fontFamily: Sora.SemiBold,
    fontSize: 17,
    color: BrandColors.white,
    letterSpacing: 0.1,
  },
  arrow: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '300',
  },
}); 