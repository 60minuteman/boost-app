import { BrandColors } from '@/constants/Colors';
import { Sora } from '@/constants/Typography';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  children?: React.ReactNode;
}

export default function ChatBubble({ message, isUser, children }: ChatBubbleProps) {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {message}
        </Text>
        {children && (
          <View style={styles.childrenContainer}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 20,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '90%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: BrandColors.white,
    borderBottomRightRadius: 6,
  },
  botBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 6,
  },
  text: {
    fontFamily: Sora.Regular,
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: BrandColors.black,
  },
  botText: {
    color: BrandColors.white,
  },
  childrenContainer: {
    marginTop: 12,
  },
}); 