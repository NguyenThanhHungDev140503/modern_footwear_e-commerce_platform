import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface CheckoutProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Xác nhận thanh toán', description: 'Kiểm tra đơn hàng' },
  { number: 2, title: 'Phương thức thanh toán', description: 'Chọn cách thanh toán' },
  { number: 3, title: 'Thông tin thanh toán', description: 'Nhập thông tin' },
  { number: 4, title: 'Kết quả thanh toán', description: 'Hoàn thành' }
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  {
                    'bg-green-500 border-green-500 text-white': step.number < currentStep,
                    'bg-blue-500 border-blue-500 text-white': step.number === currentStep,
                    'bg-gray-200 border-gray-300 text-gray-500': step.number > currentStep,
                  }
                )}
              >
                {step.number < currentStep ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="mt-3 text-center">
                <div
                  className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    {
                      'text-green-600': step.number < currentStep,
                      'text-blue-600': step.number === currentStep,
                      'text-gray-500': step.number > currentStep,
                    }
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-4 relative">
                <div className="absolute inset-0 bg-gray-300"></div>
                <div
                  className={cn(
                    'absolute inset-0 bg-green-500 transition-all duration-500',
                    {
                      'w-full': step.number < currentStep,
                      'w-0': step.number >= currentStep,
                    }
                  )}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}