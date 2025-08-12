import { Button } from '@/components/ui/button';
import { CheckoutState } from '@/types/checkout';
import { useState } from 'react';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface PaymentMethodProps {
  checkoutState: CheckoutState;
  onNext: () => void;
  onBack: () => void;
  onUpdateState: (updates: Partial<CheckoutState>) => void;
}

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Thẻ tín dụng/Thẻ ghi nợ',
    description: 'Visa, Mastercard, American Express',
    icon: '💳'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Thanh toán qua tài khoản PayPal',
    icon: '🅿️'
  },
  {
    id: 'bank-transfer',
    name: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản trực tiếp',
    icon: '🏦'
  },
  {
    id: 'momo',
    name: 'MoMo',
    description: 'Ví điện tử MoMo',
    icon: '📱'
  }
];

export function PaymentMethod({ checkoutState, onNext, onBack, onUpdateState }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState(checkoutState.paymentMethod || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }

    setIsLoading(true);
    onUpdateState({ isLoading: true, paymentMethod: selectedMethod });
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    onUpdateState({ isLoading: false });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Chọn phương thức thanh toán</h2>
            
            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="relative">
                  <input
                    type="radio"
                    id={method.id}
                    name="payment-method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={method.id}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMethod === method.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">🔒</span>
                <span className="text-sm text-gray-600">
                  Thông tin thanh toán của bạn được bảo mật bằng mã hóa SSL 256-bit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span>${checkoutState.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế:</span>
                <span>${checkoutState.tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng:</span>
                <span>${checkoutState.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleContinue}
                disabled={isLoading || !selectedMethod}
              >
                {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onBack}
                disabled={isLoading}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}