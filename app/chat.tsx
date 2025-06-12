import ChatBubble from '@/components/chat/ChatBubble';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import PayButton from '@/components/chat/PayButton';
import PaymentModal from '@/components/chat/PaymentModal';
import PaymentPills from '@/components/chat/PaymentPills';
import QuantityPills from '@/components/chat/QuantityPills';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { BrandColors } from '@/constants/Colors';
import { ChatService, type ChatResponse } from '@/services/ChatService';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  showQuantityPills?: boolean;
  showPaymentPills?: boolean;
  showPayButton?: boolean;
  amount?: string;
  showContinueOptions?: boolean;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Initialize ChatService with platform and service context
  const platformName = params.platform as string || 'Instagram';
  const serviceName = params.service as string || 'Followers';
  const title = `${platformName} ${serviceName}`;
  
  // Initialize simplified ChatService
  const chatService = useRef(new ChatService(platformName, serviceName));
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  
  const quantities = [500, 1000, 1500, 2000];

  // Initialize chat with context-aware greeting
  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = () => {
    console.log('🚀 Initializing chat with:', { platformName, serviceName });
    try {
      const response = chatService.current.processMessage('start');
      console.log('🚀 Initial chat response:', response);
      addBotMessageFromResponse(response);
    } catch (error) {
      console.error('❌ Failed to initialize chat:', error);
      // Fallback greeting
      addBotMessage('Hey buddy! How can I help you today?');
    }
  };

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, showTypingIndicator]);

  const addBotMessage = (text: string, delay: number = 1500) => {
    console.log('🤖 Adding bot message:', text);
    setShowTypingIndicator(true);
    
    setTimeout(() => {
      setShowTypingIndicator(false);
      const botMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: false,
      };
      setMessages(prev => [...prev, botMessage]);
      console.log('🤖 Bot message added to state');
    }, delay);
  };

  const addBotMessageFromResponse = (response: ChatResponse, delay: number = 1500) => {
    console.log('🤖 Adding bot message from response:', response);
    setShowTypingIndicator(true);
    
    setTimeout(() => {
      setShowTypingIndicator(false);
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.message,
        isUser: false,
        showQuantityPills: response.showQuantityPills,
        showPaymentPills: response.showPaymentPills,
        showPayButton: response.showPayButton,
        amount: response.amount,
        showContinueOptions: response.showContinueOptions,
      };
      setMessages(prev => [...prev, botMessage]);
      console.log('🤖 Bot response message added to state:', botMessage);

      // Handle automatic chat closure
      if (response.shouldCloseChat) {
        console.log('🚪 Auto-closing chat as requested by response');
        handleClose();
      }
    }, delay);
  };

  const handleQuantitySelect = (quantity: number) => {
    console.log('🔢 Quantity selected:', quantity);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `I want ${quantity} ${serviceName.toLowerCase()}`,
      isUser: true,
    };
    
    setMessages(prev => [
      ...prev.map(msg => ({ ...msg, showQuantityPills: false })),
      userMessage
    ]);
    console.log('🔢 User quantity message added');
    
    // Process with ChatService
    try {
      const response = chatService.current.processMessage(quantity.toString());
      console.log('🔢 Quantity response from ChatService:', response);
      setTimeout(() => {
        addBotMessageFromResponse(response);
      }, 500);
    } catch (error) {
      console.error('❌ Failed to process quantity selection:', error);
      addBotMessage('Perfect! Now, how would you like to pay for this?');
    }
  };

  const handlePaymentSelect = (paymentId: string) => {
    console.log('💳 Payment method selected:', paymentId);
    
    if (paymentId === 'usd') {
      // Skip USD Card for now
      console.log('💳 USD payment skipped');
      return;
    }
    
    const paymentLabels = {
      ngn: 'Pay with NGN',
      crypto: 'Pay with Crypto', 
      usd: 'Pay with USD Card'
    };
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: paymentLabels[paymentId as keyof typeof paymentLabels],
      isUser: true,
    };
    
    setMessages(prev => [
      ...prev.map(msg => ({ ...msg, showPaymentPills: false })),
      userMessage
    ]);
    console.log('💳 User payment message added');
    
    // Process with ChatService
    try {
      const response = chatService.current.processMessage(paymentId);
      console.log('💳 Payment response from ChatService:', response);
      setTimeout(() => {
        addBotMessageFromResponse(response);
      }, 500);
    } catch (error) {
      console.error('❌ Failed to process payment selection:', error);
      addBotMessage(`Please paste your ${platformName} profile URL here.\n\nExample: https://instagram.com/username`);
    }
  };

  const handleSendMessage = (message: string) => {
    console.log('💬 User message sent:', message);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    console.log('💬 User message added to state');
    
    // Process with ChatService
    try {
      setShowTypingIndicator(true);
      const response = chatService.current.processMessage(message);
      console.log('💬 Message response from ChatService:', response);
      setTimeout(() => {
        addBotMessageFromResponse(response, 1000);
      }, 500);
    } catch (error) {
      console.error('❌ Failed to process message:', error);
      setShowTypingIndicator(false);
      // Fallback response
      addBotMessage("I understand! Let me help you with that.", 1000);
    }
  };

  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmed = () => {
    console.log('💳 Payment confirmed button clicked');
    
    // Add user message first
    const userMessage: Message = {
      id: Date.now().toString(),
      text: 'I have made payment',
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    console.log('💳 User payment message added');
    
    // Close the modal
    setShowPaymentModal(false);
    console.log('💳 Payment modal closed');
    
    // Process payment confirmation with ChatService
    try {
      console.log('💳 Processing payment confirmation message');
      // This will show "Payment confirmed! Thank you buddy, Your X followers will arrive shortly."
      const response = chatService.current.processMessage('I have made payment');
      console.log('💳 Payment confirmation response:', response);
      
      // Show the payment success message
      addBotMessageFromResponse(response, 500);
      
      // Wait a bit and then show the note with close button
      setTimeout(() => {
        console.log('💳 Showing notes after payment confirmation');
        
        const confirmationResponse = chatService.current.triggerConfirmation();
        console.log('💳 Notes with close button response:', confirmationResponse);
        
        addBotMessageFromResponse(confirmationResponse, 1000);
        
        // Deactivate the pay button
        setTimeout(() => {
          console.log('💳 Payment completed');
          setPaymentConfirmed(true);
        }, 1500);
      }, 3000);
      
    } catch (error) {
      console.error('❌ Failed to process payment confirmation:', error);
      addBotMessage('A few seconds please, confirming your payment.', 500);
    }
  };

  const handleClose = () => {
    router.back();
  };

  // Get current context for payment modal
  const getCurrentContext = () => {
    return chatService.current.getContext();
  };

  // Handle continue option selection
  const handleContinueChoice = (choice: 'close') => {
    console.log('🔄 Continue choice selected:', choice);
    
    // Add user message and close
    const userMessage: Message = {
      id: Date.now().toString(),
      text: 'Close chat',
      isUser: true,
    };
    
    setMessages(prev => [
      ...prev.map(msg => ({ ...msg, showContinueOptions: false })),
      userMessage
    ]);
    
    // Process with ChatService
    try {
      const response = chatService.current.handleUserChoice('close chat');
      console.log('🔄 Close choice response:', response);
      setTimeout(() => {
        addBotMessageFromResponse(response);
      }, 500);
    } catch (error) {
      console.error('❌ Failed to process close choice:', error);
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ImageBackground
        source={require('@/assets/images/home/image.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'transparent']}
          style={styles.topGradient}
          pointerEvents="none"
        />
        
        <ChatHeader title={title} platformName={platformName} onClose={handleClose} />
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
            >
              {message.showQuantityPills && (
                <QuantityPills
                  quantities={quantities}
                  selectedQuantity={getCurrentContext().selectedQuantity || null}
                  onQuantitySelect={handleQuantitySelect}
                />
              )}
              {message.showPaymentPills && (
                <PaymentPills
                  selectedPayment={getCurrentContext().selectedPayment || null}
                  onPaymentSelect={handlePaymentSelect}
                />
              )}
              {message.showPayButton && message.amount && !paymentConfirmed && (
                <PayButton
                  amount={message.amount}
                  onPayNow={handlePayNow}
                  disabled={paymentConfirmed}
                />
              )}
              {message.showContinueOptions && (
                <View style={styles.continueOptionsContainer}>
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => handleContinueChoice('close')}
                  >
                    <Text style={styles.continueButtonText}>Close Chat</Text>
                  </Pressable>
                </View>
              )}
            </ChatBubble>
          ))}
          
          {showTypingIndicator && <TypingIndicator />}
        </ScrollView>
        
        <ChatInput
          placeholder="type your response here"
          onSend={handleSendMessage}
        />
        
        <PaymentModal
          visible={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentConfirmed={handlePaymentConfirmed}
          paymentMethod={getCurrentContext().selectedPayment || ''}
          amount={messages.find(m => m.showPayButton)?.amount || ''}
          quantity={getCurrentContext().selectedQuantity || 0}
          platformName={platformName}
          serviceName={serviceName}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 20,
    flexGrow: 1,
  },
  pillsContainer: {
    marginVertical: 16,
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 120,
  },
  continueOptionsContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    color: BrandColors.white,
    textAlign: 'center',
  },
}); 