import { Button } from '@/components/ui/button';
import { CheckoutState } from '@/types/checkout';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

interface PaymentResultProps {
  checkoutState: CheckoutState;
  onUpdateState: (updates: Partial<CheckoutState>) => void;
}

export function PaymentResult({ checkoutState }: PaymentResultProps) {
  const navigate = useNavigate();
  const [isSuccess] = useState(Math.random() > 0.1); // 90% success rate for demo
  const [orderNumber] = useState(`TSH${Date.now().toString().slice(-8)}`);

  useEffect(() => {
    // Simulate final processing
    const timer = setTimeout(() => {
      // You can add any final processing here
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thanh toán thành công! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và sẽ được xử lý sớm nhất.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Mã đơn hàng:</span>
                <p className="font-mono text-lg font-bold text-blue-600">{orderNumber}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tổng tiền:</span>
                <p className="text-lg font-bold">${checkoutState.total.toFixed(2)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phương thức thanh toán:</span>
                <p className="capitalize">{checkoutState.paymentMethod}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Ước tính giao hàng:</span>
                <p>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm đã mua:</h3>
            <div className="space-y-3">
              {checkoutState.cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Số lượng: {item.quantity} • Size: {item.size}</p>
                  </div>
                  <div className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="px-6"
            >
              Tiếp tục mua sắm
            </Button>
            <Button 
              onClick={() => navigate('/orders')}
              variant="outline"
              size="lg"
              className="px-6"
            >
              Xem đơn hàng
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p className="mb-2">
              📧 Chúng tôi đã gửi email xác nhận đến <span className="font-medium">
                {checkoutState.paymentInfo?.email}
              </span>
            </p>
            <p>
              📞 Cần hỗ trợ? Liên hệ: <span className="font-medium text-blue-600">1800-1234</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Payment Failed
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <XCircleIcon className="w-8 h-8 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thanh toán không thành công
        </h1>
        <p className="text-gray-600 mb-6">
          Đã xảy ra lỗi trong quá trình xử lý thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>Lỗi:</strong> Thẻ tín dụng không được chấp nhận hoặc thông tin không chính xác.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.location.reload()}
            size="lg"
            className="px-6"
          >
            Thử lại
          </Button>
          <Button 
            onClick={() => navigate('/cart')}
            variant="outline"
            size="lg"
            className="px-6"
          >
            Quay lại giỏ hàng
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p>
            📞 Cần hỗ trợ? Liên hệ: <span className="font-medium text-blue-600">1800-1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}