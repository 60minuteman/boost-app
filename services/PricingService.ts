import { ENV } from '@/config/environment';

// Backend API Response Types (based on actual API response)
export interface BackendPricingResponse {
  platform: string;
  service: string;
  quantity: number;
  currency: string;
  price: number;
  serviceName: string;
  providerRate: number;
  ourRate: number;
  minOrder: number;
  maxOrder: number;
  calculation: {
    pricePerUnit: number;
    basePriceUSDT: number;
    exchangeRate: string | number;
  };
}

export class PricingService {
  // ONLY Backend Pricing - No Local Calculations

  // Calculate price using backend API
  async calculatePriceFromBackend(
    platform: string,
    service: string,
    quantity: number,
    currency: string
  ): Promise<BackendPricingResponse> {
    const endpoint = `${ENV.api.backendUrl}/orders/pricing`;
    const params = new URLSearchParams({
      platform: platform.toLowerCase(), // Convert to lowercase for backend
      service: service.toLowerCase(),   // Convert to lowercase for backend
      quantity: quantity.toString(),
      currency
    });

    const url = `${endpoint}?${params}`;
    console.log('🚀 Backend pricing request URL:', url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📨 Backend pricing response status:', response.status);

      if (!response.ok) {
        throw new Error(`Backend pricing API failed: ${response.status} ${response.statusText}`);
      }

      const data: BackendPricingResponse = await response.json();
      console.log('📨 Backend pricing response data:', data);

      return data;
    } catch (error) {
      console.error('❌ Backend pricing request failed:', error);
      throw error;
    }
  }

  // Validate order against backend constraints
  async validateOrderWithBackend(
    platform: string,
    service: string,
    quantity: number,
    currency: string
  ): Promise<{ isValid: boolean; message?: string }> {
    console.log('🔍 Validating order with backend constraints');
    
    try {
      const backendPricing = await this.calculatePriceFromBackend(platform.toLowerCase(), service.toLowerCase(), quantity, currency);
      
      if (quantity < backendPricing.minOrder) {
        return {
          isValid: false,
          message: `❌ Minimum order quantity is ${backendPricing.minOrder.toLocaleString()}`
        };
      }
      
      if (quantity > backendPricing.maxOrder) {
        return {
          isValid: false,
          message: `❌ Maximum order quantity is ${backendPricing.maxOrder.toLocaleString()}`
        };
      }
      
      console.log('✅ Order validation passed with backend constraints');
      return { isValid: true };
      
    } catch (error) {
      console.error('❌ Backend validation failed:', error);
      return {
        isValid: false,
        message: '❌ Unable to validate order with backend. Please try again.'
      };
    }
  }

  // Prepare order payload with backend pricing
  async prepareOrderPayload(
    platform: string,
    service: string,
    quantity: number,
    currency: string,
    link: string,
    paymentMethod: string
  ) {
    console.log('📦 Preparing order payload with backend pricing');
    
    try {
      const backendPricing = await this.calculatePriceFromBackend(platform.toLowerCase(), service.toLowerCase(), quantity, currency);
      
      const orderPayload = {
        platform: backendPricing.platform,
        service: backendPricing.service,
        serviceName: backendPricing.serviceName,
        quantity: backendPricing.quantity,
        link,
        currency: backendPricing.currency,
        price: backendPricing.price,
        paymentMethod,
        providerRate: backendPricing.providerRate,
        ourRate: backendPricing.ourRate,
        calculation: backendPricing.calculation,
        minOrder: backendPricing.minOrder,
        maxOrder: backendPricing.maxOrder,
        timestamp: new Date().toISOString()
      };
      
      console.log('📦 Order payload prepared with backend pricing:', orderPayload);
      return orderPayload;
      
    } catch (error) {
      console.error('❌ Failed to prepare order payload:', error);
      throw new Error('Unable to prepare order with backend pricing');
    }
  }
}

