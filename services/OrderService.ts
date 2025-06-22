import { ENV } from '@/config/environment';

// Order Service - Handles order creation and status checking only
// Payment operations moved to PaymentService

export interface CreateOrderRequest {
  platform: string;
  service: string;
  quantity: number;
  amount: string;
  currency: string;
  paymentMethod: string;
  socialUrl: string;
  timestamp: string;
}

export interface OrderResponse {
  id: string;
  status: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  platform: string;
  service: string;
  quantity: number;
  socialUrl: string;
  createdAt: string;
  payment: {
    id: string;
    status: string;
    amount: string;
    currency: string;
    method: string;
  };
}

export interface OrderStatusResponse {
  id: string;
  status: string;
  progress: number;
  startCount: number;
  remains: number;
}

export class OrderService {
  private baseUrl = ENV.api.backendUrl;

  // 1. Create Order
  async createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
    console.log('📋 OrderService: Creating order:', orderData);
    
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('📋 OrderService: Order creation response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('📋 OrderService: Order creation failed:', response.status, errorText);
        throw new Error(`Order creation failed: ${response.status} ${response.statusText}`);
      }

      const data: OrderResponse = await response.json();
      console.log('📋 OrderService: Order created successfully:', data.id);

      return data;
    } catch (error) {
      console.error('❌ OrderService: Order creation error:', error);
      throw error;
    }
  }

  // 2. Check Order Status
  async checkOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    console.log('📋 OrderService: Checking order status for:', orderId);
    
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`);

      console.log('📋 OrderService: Order status response:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('📋 OrderService: Order status check failed:', response.status, errorText);
        throw new Error(`Order status check failed: ${response.status} ${response.statusText}`);
      }

      const data: OrderStatusResponse = await response.json();
      console.log('📋 OrderService: Order status:', data.status, `${data.progress}%`, `${data.remains} remaining`);

      return data;
    } catch (error) {
      console.error('❌ OrderService: Order status check error:', error);
      throw error;
    }
  }

  // 3. Helper: Get order progress message
  getOrderProgressMessage(status: string, progress?: number, remains?: number): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Your order is pending payment verification.';
      case 'processing':
        return `Your order is being processed. ${progress || 0}% complete, ${remains || 0} remaining.`;
      case 'completed':
        return 'Your order has been completed successfully!';
      case 'failed':
        return 'Your order failed. Please contact support for assistance.';
      default:
        return 'Order status unknown. Please contact support.';
    }
  }
} 