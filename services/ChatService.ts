interface ChatContext {
  platform: string;
  service: string;
  selectedQuantity?: number;
  selectedPayment?: string;
  socialUrl?: string;
  currentState: ChatState;
}

interface ChatResponse {
  message: string;
  showQuantityPills?: boolean;
  showPaymentPills?: boolean;
  showPayButton?: boolean;
  amount?: string;
  nextState?: ChatState;
  shouldCloseChat?: boolean;
  showContinueOptions?: boolean;
}

enum ChatState {
  GREETING = 'greeting',
  QUANTITY_SELECTION = 'quantity_selection',
  PAYMENT_SELECTION = 'payment_selection',
  URL_COLLECTION = 'url_collection',
  PAYMENT_PROCESSING = 'payment_processing',
  CONFIRMATION = 'confirmation',
  USER_CHOICE = 'user_choice',
  COMPLETED = 'completed'
}

class ChatService {
  private context: ChatContext;

  constructor(platform: string, service: string) {
    this.context = {
      platform,
      service,
      currentState: ChatState.GREETING
    };
    console.log('🔧 ChatService initialized:', {
      platform,
      service,
      initialState: this.context.currentState
    });
  }

  // Main entry point for processing user messages
  processMessage(userMessage: string): ChatResponse {
    console.log('📥 Processing message:', {
      input: userMessage,
      currentState: this.context.currentState,
      context: this.context
    });

    // Handle rule-based processing
    const response = this.handleRuleBasedResponse(userMessage);
    if (response) {
      console.log('✅ Rule-based response found:', response);
      return response;
    }

    // Fallback response for unrecognized inputs
    const fallback = this.getGenericFallback(userMessage);
    console.log('⚠️ Using fallback response:', fallback);
    return fallback;
  }

  // Rule-based intelligent responses
  private handleRuleBasedResponse(message: string): ChatResponse | null {
    const lowerMessage = message.toLowerCase().trim();
    console.log('🔍 Checking rule-based response for:', {
      message: lowerMessage,
      state: this.context.currentState
    });

    switch (this.context.currentState) {
      case ChatState.GREETING:
        console.log('🎯 Handling GREETING state');
        return this.getGreeting();

      case ChatState.QUANTITY_SELECTION:
        console.log('🎯 Handling QUANTITY_SELECTION state');
        return this.handleQuantityInput(message);

      case ChatState.PAYMENT_SELECTION:
        console.log('🎯 Handling PAYMENT_SELECTION state');
        return this.handlePaymentInput(message);

      case ChatState.URL_COLLECTION:
        console.log('🎯 Handling URL_COLLECTION state');
        return this.handleUrlInput(message);

      case ChatState.PAYMENT_PROCESSING:
        console.log('🎯 Handling PAYMENT_PROCESSING state');
        return this.handlePaymentProcessing(message);

      case ChatState.CONFIRMATION:
        console.log('🎯 Handling CONFIRMATION state');
        return this.handleConfirmation();

      case ChatState.USER_CHOICE:
        console.log('🎯 Handling USER_CHOICE state');
        return this.handleUserChoice(message);

      default:
        console.log('❌ No handler for state:', this.context.currentState);
        return null;
    }
  }

  // Context-aware greeting based on platform and service
  private getGreeting(): ChatResponse {
    console.log('👋 Generating greeting for:', {
      platform: this.context.platform,
      service: this.context.service
    });

    const templates = {
      instagram: {
        followers: "Hey buddy! Ready to boost your Instagram presence? How many followers would you like to add to your account?",
        likes: "Hey buddy! Let's get your Instagram posts trending! How many likes do you need?",
        comments: "Hey buddy! Want to spark engagement on your Instagram? How many comments would you like?",
        views: "Hey buddy! Time to increase your Instagram reach! How many views do you want?"
      },
      tiktok: {
        followers: "Hey buddy! Ready to go viral on TikTok? How many followers should we add?",
        likes: "Hey buddy! Let's make your TikTok blow up! How many likes do you need?",
        comments: "Hey buddy! Want your TikTok to get buzzing? How many comments would you like?",
        views: "Hey buddy! Time to boost your TikTok views! How many views do you want?"
      },
      twitter: {
        followers: "Hey buddy! Ready to grow your Twitter influence? How many followers do you need?",
        likes: "Hey buddy! Let's get your tweets noticed! How many likes would you like?",
        comments: "Hey buddy! Want more engagement on Twitter? How many comments do you need?",
        views: "Hey buddy! Time to expand your Twitter reach! How many views do you want?"
      },
      youtube: {
        followers: "Hey buddy! Ready to build your YouTube channel? How many subscribers do you need?",
        likes: "Hey buddy! Let's boost your YouTube videos! How many likes would you like?",
        comments: "Hey buddy! Want more interaction on YouTube? How many comments do you need?",
        views: "Hey buddy! Time to increase your YouTube views! How many views do you want?"
      }
    };

    const platformKey = this.context.platform.toLowerCase() as keyof typeof templates;
    const serviceKey = this.context.service.toLowerCase() as keyof typeof templates.instagram;
    
    const message = templates[platformKey]?.[serviceKey] || 
      `Hey buddy! How many ${this.context.service.toLowerCase()} do you want for your ${this.context.platform} account?`;

    this.context.currentState = ChatState.QUANTITY_SELECTION;
    
    const response = {
      message,
      showQuantityPills: true,
      nextState: ChatState.QUANTITY_SELECTION
    };

    console.log('👋 Greeting generated:', response);
    return response;
  }

  // Handle quantity-related inputs
  private handleQuantityInput(message: string): ChatResponse | null {
    console.log('🔢 Processing quantity input:', message);
    
    const quantityMatch = message.match(/(\d+)/);
    console.log('🔢 Quantity match result:', quantityMatch);
    
    if (quantityMatch) {
      const quantity = parseInt(quantityMatch[1]);
      console.log('🔢 Parsed quantity:', quantity);
      
      // Validate quantity range
      if (quantity < 100) {
        console.log('🔢 Quantity too low');
        return {
          message: "❌ Minimum quantity is 100. Please select at least 100 followers.",
          showQuantityPills: true,
          nextState: ChatState.QUANTITY_SELECTION
        };
      }
      
      if (quantity > 10000) {
        console.log('🔢 Quantity too high');
        return {
          message: "❌ Maximum quantity is 10,000. Please select a lower amount or contact support for bulk orders.",
          showQuantityPills: true,
          nextState: ChatState.QUANTITY_SELECTION
        };
      }
      
      this.context.selectedQuantity = quantity;
      this.context.currentState = ChatState.PAYMENT_SELECTION;

      const response = {
        message: "Perfect! Now, how would you like to pay for this?",
        showPaymentPills: true,
        nextState: ChatState.PAYMENT_SELECTION
      };

      console.log('🔢 Quantity response:', response);
      console.log('🔢 Updated context:', this.context);
      return response;
    }
    
    console.log('🔢 No quantity found - returning error message');
    return {
      message: "❌ Please enter a number (like 1000) or select from the options above.",
      showQuantityPills: true,
      nextState: ChatState.QUANTITY_SELECTION
    };
  }

  // Handle payment-related inputs
  private handlePaymentInput(message: string): ChatResponse | null {
    const lowerMessage = message.toLowerCase().trim();
    console.log('💳 Processing payment input:', lowerMessage);
    
    if (lowerMessage.includes('ngn') || lowerMessage.includes('naira') || lowerMessage === 'pay with ngn') {
      console.log('💳 NGN payment selected');
      this.context.selectedPayment = 'ngn';
      this.context.currentState = ChatState.URL_COLLECTION;
      const response = this.getUrlRequest();
      console.log('💳 NGN response:', response);
      console.log('💳 Updated context:', this.context);
      return response;
    }
    
    if (lowerMessage.includes('crypto') || lowerMessage.includes('usdt') || lowerMessage === 'pay with crypto') {
      console.log('💳 Crypto payment selected');
      this.context.selectedPayment = 'crypto';
      this.context.currentState = ChatState.URL_COLLECTION;
      const response = this.getUrlRequest();
      console.log('💳 Crypto response:', response);
      console.log('💳 Updated context:', this.context);
      return response;
    }
    
    console.log('💳 No payment method found - returning error message');
    return {
      message: "❌ Please select a payment method from the options above (NGN or Crypto).",
      showPaymentPills: true,
      nextState: ChatState.PAYMENT_SELECTION
    };
  }

  // Context-aware URL request
  private getUrlRequest(): ChatResponse {
    console.log('🔗 Generating URL request for platform:', this.context.platform);
    
    const platformExamples = {
      instagram: 'https://instagram.com/username',
      tiktok: 'https://tiktok.com/@username',
      twitter: 'https://twitter.com/username',
      youtube: 'https://youtube.com/@channelname'
    };

    const example = platformExamples[this.context.platform.toLowerCase() as keyof typeof platformExamples] || 
      `https://${this.context.platform.toLowerCase()}.com/username`;

    const response = {
      message: `Please paste your ${this.context.platform} profile URL here.\n\nExample: ${example}`,
      nextState: ChatState.URL_COLLECTION
    };

    console.log('🔗 URL request response:', response);
    return response;
  }

  // Handle URL inputs - Show total amount with pay button
  private handleUrlInput(message: string): ChatResponse | null {
    console.log('🔗 Processing URL input:', message);
    
    const cleanMessage = message.toLowerCase().trim();
    
    // Define comprehensive platform validation
    const platformValidation = {
      instagram: [
        'instagram.com',
        'www.instagram.com',
        'ig.com',
        'www.ig.com'
      ],
      tiktok: [
        'tiktok.com',
        'www.tiktok.com',
        'vm.tiktok.com',
        'm.tiktok.com'
      ],
      twitter: [
        'twitter.com',
        'www.twitter.com',
        'x.com',
        'www.x.com',
        'mobile.twitter.com'
      ],
      youtube: [
        'youtube.com',
        'www.youtube.com',
        'youtu.be',
        'www.youtu.be',
        'm.youtube.com'
      ],
      snapchat: [
        'snapchat.com',
        'www.snapchat.com',
        't.snapchat.com'
      ]
    };
    
    // Get valid domains for the current platform
    const currentPlatform = this.context.platform.toLowerCase();
    const validDomains = platformValidation[currentPlatform as keyof typeof platformValidation];
    
    console.log('🔗 URL validation details:', {
      message: cleanMessage,
      currentPlatform,
      validDomains,
      originalMessage: message
    });
    
    if (!validDomains) {
      console.log('🔗 Platform not supported:', currentPlatform);
      return {
        message: `❌ Platform ${this.context.platform} is not supported yet. Please contact support.`,
        nextState: ChatState.URL_COLLECTION
      };
    }
    
    // Check if URL contains any valid domain for this platform
    const hasValidUrl = validDomains.some(domain => cleanMessage.includes(domain));
    
    // Additional validation: must look like a URL (contains http/https or www or domain)
    const looksLikeUrl = cleanMessage.includes('http') || 
                        cleanMessage.includes('www.') || 
                        validDomains.some(domain => cleanMessage.includes(domain));
    
    console.log('🔗 URL validation result:', {
      hasValidUrl,
      looksLikeUrl,
      finalValid: hasValidUrl && looksLikeUrl
    });
    
    if (hasValidUrl && looksLikeUrl) {
      console.log('🔗 Valid URL found');
      this.context.socialUrl = message;
      this.context.currentState = ChatState.PAYMENT_PROCESSING;
      
      const amount = this.calculateAmount();
      const response = {
        message: `Great! The total amount for ${this.context.selectedQuantity} ${this.context.service.toLowerCase()} is ${amount}`,
        showPayButton: true,
        amount,
        nextState: ChatState.PAYMENT_PROCESSING
      };

      console.log('🔗 URL response:', response);
      console.log('🔗 Updated context:', this.context);
      return response;
    }
    
    console.log('🔗 Invalid URL - returning error message');
    
    // Generate platform-specific example
    const examples = {
      instagram: 'https://instagram.com/username or https://www.instagram.com/username',
      tiktok: 'https://tiktok.com/@username or https://www.tiktok.com/@username',
      twitter: 'https://twitter.com/username or https://x.com/username',
      youtube: 'https://youtube.com/@channel or https://youtu.be/channelid',
      snapchat: 'https://snapchat.com/add/username or https://t.snapchat.com/username'
    };
    
    const example = examples[currentPlatform as keyof typeof examples] || 
                   `https://${currentPlatform}.com/username`;
    
    return {
      message: `❌ Please enter a valid ${this.context.platform} URL.\n\nExamples:\n${example}`,
      nextState: ChatState.URL_COLLECTION
    };
  }

  // Handle payment processing state
  private handlePaymentProcessing(message: string): ChatResponse {
    console.log('💰 Processing payment message:', message);

    const lowerMessage = message.toLowerCase();
    
    // Check for payment confirmation response
    if (lowerMessage.includes('payment') || lowerMessage.includes('paid') || lowerMessage.includes('done')) {
      console.log('💰 Payment confirmed, transitioning to confirmation state');
      this.context.currentState = ChatState.CONFIRMATION;
      
      return {
        message: `Payment confirmed!\nThank you buddy, Your ${this.context.selectedQuantity} ${this.context.service.toLowerCase()} will arrive shortly.`,
        nextState: ChatState.CONFIRMATION
      };
    }

    return {
      message: "Please click the 'I have paid' button once you've completed your payment.",
      nextState: ChatState.PAYMENT_PROCESSING
    };
  }

  // Handle confirmation state
  handleConfirmation(): ChatResponse {
    console.log('✅ Handling confirmation');
    this.context.currentState = ChatState.USER_CHOICE;
    
    const response = {
      message: `ℕ𝕠𝕥𝕖𝕤\n📌 We can not cancel your order once it has been submitted.\n📌 Check the link format carefully before placing the order.\n📌 Kindly make sure your account is public, Not private.`,
      showContinueOptions: true,
      nextState: ChatState.USER_CHOICE
    };
    console.log('✅ Confirmation response with note and close option:', response);
    return response;
  }

  // Handle user choice after completion
  handleUserChoice(choice: string): ChatResponse {
    console.log('🔄 Processing user choice:', choice);
    this.context.currentState = ChatState.COMPLETED;
    return {
      message: 'Thank you for choosing us! Chat session ended.',
      shouldCloseChat: true,
      nextState: ChatState.COMPLETED
    };
  }

  // Trigger manual confirmation (for payment flow)
  triggerConfirmation(): ChatResponse {
    console.log('🎯 Manually triggering confirmation');
    return this.handleConfirmation();
  }

  // Calculate amount based on context
  private calculateAmount(): string {
    const quantity = this.context.selectedQuantity || 500;
    const basePrice = quantity * 4.5; // Base price per item in NGN
    
    let amount = '';
    if (this.context.selectedPayment === 'crypto') {
      amount = `$${(basePrice / 1500).toFixed(2)} USDT`;
    } else if (this.context.selectedPayment === 'ngn') {
      amount = `₦${basePrice.toLocaleString()}`;
    } else {
      amount = `₦${basePrice.toLocaleString()}`;
    }
    
    console.log('💰 Amount calculated:', {
      quantity,
      basePrice,
      paymentMethod: this.context.selectedPayment,
      finalAmount: amount
    });
    
    return amount;
  }

  // Generic fallback for unrecognized inputs - NOW REMOVED
  private getGenericFallback(userMessage: string): ChatResponse {
    console.log('🔄 Unrecognized input in state:', this.context.currentState, 'message:', userMessage);
    
    // Provide state-specific error messages instead of generic fallbacks
    switch (this.context.currentState) {
      case ChatState.QUANTITY_SELECTION:
        return {
          message: "❌ Please enter a number for the quantity you want, or select from the options above.",
          showQuantityPills: true,
          nextState: ChatState.QUANTITY_SELECTION
        };
        
      case ChatState.PAYMENT_SELECTION:
        return {
          message: "❌ Please select a payment method from the options above (NGN or Crypto).",
          showPaymentPills: true,
          nextState: ChatState.PAYMENT_SELECTION
        };
        
      case ChatState.URL_COLLECTION:
        return {
          message: `❌ Please enter a valid ${this.context.platform} profile URL.\n\nExample: https://${this.context.platform.toLowerCase()}.com/username`,
          nextState: ChatState.URL_COLLECTION
        };
        
      case ChatState.PAYMENT_PROCESSING:
        return {
          message: "❌ Please tap the payment button above to proceed, or type 'I have made payment' after completing your payment.",
          nextState: ChatState.PAYMENT_PROCESSING
        };
        
      default:
        return {
          message: "❌ I didn't understand that. Please follow the prompts above.",
          nextState: this.context.currentState
        };
    }
  }

  // Get current context
  getContext(): ChatContext {
    console.log('📊 Getting context:', this.context);
    return { ...this.context };
  }

  // Update context manually if needed
  updateContext(updates: Partial<ChatContext>): void {
    console.log('🔧 Updating context:', { before: this.context, updates });
    this.context = { ...this.context, ...updates };
    console.log('🔧 Context updated:', this.context);
  }
}

export { ChatService, ChatState, type ChatContext, type ChatResponse };
