import { Button } from '@/components/ui/button';
import { CheckoutState } from '@/types/checkout';
import { useState } from 'react';

interface OrderConfirmationProps {
  checkoutState: CheckoutState;
  onNext: () => void;
  onUpdateState: (updates: Partial<CheckoutState>) => void;
}

export function OrderConfirmation({ checkoutState, onNext, onUpdateState }: OrderConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    onUpdateState({ isLoading: true });
    
    // Simulate validation/processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    onUpdateState({ isLoading: false });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Sản phẩm trong đơn hàng</h2>
            
            <div className="space-y-4">
              {checkoutState.cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.size && <p className="text-sm text-gray-500">Kích cỡ: {item.size}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Số lượng: {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phương thức giao hàng:</span>
                <span className="font-medium">Miễn phí (7-10 ngày)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ước tính giao hàng:</span>
                <span className="font-medium">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span>${checkoutState.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế (8%):</span>
                <span>${checkoutState.tax.toFixed(2)}</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span>${checkoutState.total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận đơn hàng'}
            </Button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}