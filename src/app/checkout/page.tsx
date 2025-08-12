import { Suspense } from 'react';
import { Checkout } from '@/components/checkout/Checkout';
import { SkeletonCheckout } from '@/components/SkeletonLoader';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<SkeletonCheckout />}>
      <Checkout />
    </Suspense>
  );
}