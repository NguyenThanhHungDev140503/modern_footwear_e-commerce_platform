import { Product } from '@/types/product';
import { useState } from 'react';

interface ProductImagesProps {
  product: Product;
}

export function ProductImages({ product }: ProductImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // For demo purposes, we'll use the same image but in a real app you'd have multiple images
  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={productImages[selectedImageIndex]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {productImages.map((image, i) => (
          <div 
            key={i} 
            className={`aspect-square overflow-hidden rounded bg-gray-100 cursor-pointer border-2 transition-colors ${
              selectedImageIndex === i ? 'border-black' : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setSelectedImageIndex(i)}
          >
            <img
              src={image}
              alt={`${product.name} ${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
