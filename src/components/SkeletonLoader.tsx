import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chiều cao của skeleton
   */
  height?: string | number;
  /**
   * Chiều rộng của skeleton
   */
  width?: string | number;
  /**
   * Có hiển thị skeleton hay không
   */
  isLoading?: boolean;
  /**
   * Nội dung hiển thị khi không loading
   */
  children?: React.ReactNode;
  /**
   * Hình dạng của skeleton (rounded, circular)
   */
  variant?: 'rectangular' | 'circular' | 'text';
  /**
   * Animation style
   */
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  height,
  width,
  isLoading = true,
  children,
  className,
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={cn(
        'bg-gray-200 animate-[var(--animation-fade-in)]',
        {
          'rounded-md': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'h-4 w-3/4 rounded': variant === 'text',
          'animate-pulse': animation === 'pulse',
          'animate-wave': animation === 'wave',
        },
        className
      )}
      style={{
        height,
        width,
      }}
      {...props}
      aria-hidden="true"
      aria-label="Loading..."
      role="status"
    />
  );
}

export function SkeletonText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      variant="text"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

export function SkeletonButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn('h-10 w-20 rounded-md', className)}
      {...props}
    />
  );
}

export function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton className="h-[200px] w-full rounded-md" />
      <SkeletonText className="h-4 w-2/3" />
      <SkeletonText className="h-4 w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <SkeletonText className="h-5 w-1/4" />
        <SkeletonButton className="h-9 w-16" />
      </div>
    </div>
  );
}

export function SkeletonCart() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b">
        <SkeletonText className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Items Skeleton */}
      <div className="space-y-4 py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="flex-1 space-y-2">
              <SkeletonText className="h-4 w-3/4" />
              <SkeletonText className="h-4 w-1/2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Skeleton */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between">
          <SkeletonText className="h-4 w-1/2" />
          <SkeletonText className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <SkeletonText className="h-4 w-1/2" />
          <SkeletonText className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between font-bold pt-2">
          <SkeletonText className="h-5 w-1/2" />
          <SkeletonText className="h-5 w-1/4" />
        </div>
      </div>

      {/* Checkout Button Skeleton */}
      <SkeletonButton className="w-full h-10 mt-4" />
    </div>
  );
}

export function SkeletonAvatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      variant="circular"
      className={cn('h-10 w-10', className)}
      {...props}
    />
  );
}

export function SkeletonNavbar() {
  return (
    <div className="w-full border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex space-x-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square w-full rounded" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Size Selector Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>

          {/* Quantity Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <div className="flex">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          {/* Button Skeletons */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCheckout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="relative flex flex-col items-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="mt-3 text-center">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                {step < 4 && (
                  <div className="flex-1 h-px mx-4">
                    <Skeleton className="h-px w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Skeleton className="w-16 h-16 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
