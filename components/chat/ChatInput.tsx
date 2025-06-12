import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatInputProps {
  placeholder: string;
  onSend: (message: string) => void;
}

export default function ChatInput({ placeholder, onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  }, [message, onSend]);

  const handleSubmitEditing = useCallback(() => {
    if (Platform.OS === 'android') {
      // On Android, handle send differently for multiline
      handleSend();
    }
  }, [handleSend]);

  const handleKeyPress = useCallback((event: any) => {
    if (Platform.OS === 'android' && event.nativeEvent.key === 'Enter') {
      // Prevent new line and send message on Android
      event.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS === 'android' && styles.textInputAndroid
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline={Platform.OS === 'ios'}
          numberOfLines={Platform.OS === 'android' ? 1 : undefined}
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSubmitEditing}
          onKeyPress={handleKeyPress}
          blurOnSubmit={false}
          underlineColorAndroid="transparent"
          textAlignVertical={Platform.OS === 'android' ? 'center' : 'top'}
        />
        <TouchableOpacity 
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
          onPress={handleSend}
          disabled={!message.trim()}
          activeOpacity={0.7}
        >
          <Image 
            source={require('@/assets/images/icons/chat/send.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    marginBottom: Platform.OS === 'android' ? -10 : -36,
  },
  textInput: {
    flex: 1,
    fontFamily: Sora.Regular,
    fontSize: 16,
    color: BrandColors.white,
    maxHeight: 100,
    minHeight: 24,
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textInputAndroid: {
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: BrandColors.lime,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: BrandColors.black,
  },
});