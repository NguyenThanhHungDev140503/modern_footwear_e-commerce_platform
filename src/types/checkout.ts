export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CheckoutState {
  currentStep: CheckoutStep;
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string | null;
  paymentInfo: PaymentInfo | null;
  isLoading: boolean;
}

export type CheckoutStep = 1 | 2 | 3 | 4;