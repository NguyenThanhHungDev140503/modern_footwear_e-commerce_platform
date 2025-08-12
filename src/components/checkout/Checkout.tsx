import { useState } from 'react';
import { CheckoutProgress } from './CheckoutProgress';
import { OrderConfirmation } from './OrderConfirmation';
import { PaymentMethod } from './PaymentMethod';
import { PaymentInfo } from './PaymentInfo';
import { PaymentResult } from './PaymentResult';
import { CheckoutState, CheckoutStep } from '@/types/checkout';

const mockCartItems = [
  {
    id: '1',
    name: 'Nike Air Jordan 1 Retro High OG',
    price: 180,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
    size: 'US 9'
  },
  {
    id: '2',
    name: 'Adidas Yeezy Boost 350 V2',
    price: 220,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
    size: 'US 10'
  }
];

export function Checkout() {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    currentStep: 1,
    cartItems: mockCartItems,
    subtotal: mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    shipping: 0,
    tax: 0,
    total: 0,
    paymentMethod: null,
    paymentInfo: null,
    isLoading: false
  });

  // Calculate total when subtotal changes
  useState(() => {
    const tax = checkoutState.subtotal * 0.08; // 8% tax
    const total = checkoutState.subtotal + checkoutState.shipping + tax;
    setCheckoutState(prev => ({ ...prev, tax, total }));
  }, [checkoutState.subtotal]);

  const handleStepChange = (step: CheckoutStep) => {
    setCheckoutState(prev => ({ ...prev, currentStep: step }));
  };

  const handleStateUpdate = (updates: Partial<CheckoutState>) => {
    setCheckoutState(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = () => {
    switch (checkoutState.currentStep) {
      case 1:
        return (
          <OrderConfirmation 
            checkoutState={checkoutState}
            onNext={() => handleStepChange(2)}
            onUpdateState={handleStateUpdate}
          />
        );
      case 2:
        return (
          <PaymentMethod 
            checkoutState={checkoutState}
            onNext={() => handleStepChange(3)}
            onBack={() => handleStepChange(1)}
            onUpdateState={handleStateUpdate}
          />
        );
      case 3:
        return (
          <PaymentInfo 
            checkoutState={checkoutState}
            onNext={() => handleStepChange(4)}
            onBack={() => handleStepChange(2)}
            onUpdateState={handleStateUpdate}
          />
        );
      case 4:
        return (
          <PaymentResult 
            checkoutState={checkoutState}
            onUpdateState={handleStateUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Thanh Toán</h1>
          <p className="text-gray-600 text-center mt-2">
            Hoàn tất đơn hàng của bạn trong vài bước đơn giản
          </p>
        </div>

        {/* Progress Bar */}
        <CheckoutProgress currentStep={checkoutState.currentStep} />

        {/* Main Content */}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}