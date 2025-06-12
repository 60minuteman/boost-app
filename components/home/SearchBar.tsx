import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  onSearchPress?: () => void;
  onMicPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: any;
}

export default function SearchBar({
  onSearchPress,
  onMicPress,
  onFocus,
  onBlur,
  containerStyle,
  placeholder = "Search for anything",
  ...textInputProps
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      console.log('Search:', searchText);
    }
  };

  const handleMic = () => {
    if (onMicPress) {
      onMicPress();
    } else {
      console.log('Voice search activated');
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search Icon */}
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={handleSearch}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../assets/images/icons/search/search.png')} 
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="search"
        {...textInputProps}
      />

      {/* Microphone Icon */}
      <TouchableOpacity 
        style={styles.micButton} 
        onPress={handleMic}
        activeOpacity={0.7}
      >
        <View style={styles.micIconContainer}>
          <Image 
            source={require('../../assets/images/icons/search/mic.png')} 
            style={styles.micIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconButton: {
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    flex: 1,
    fontFamily: Sora.Regular,
    fontSize: 16,
    color: BrandColors.white,
    paddingVertical: 0, // Remove default padding
  },
  micButton: {
    marginLeft: 12,
  },
  micIconContainer: {
    backgroundColor: BrandColors.lime,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    width: 16,
    height: 16,
    tintColor: BrandColors.black,
  },
}); 