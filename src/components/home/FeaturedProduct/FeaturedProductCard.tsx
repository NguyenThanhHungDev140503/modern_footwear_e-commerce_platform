import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'
import { Skeleton } from '@/components/SkeletonLoader'
import { Product } from '@/types/product'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ProductCardProps =
  | { type: 'full'; product: Product }
  | {
      type: 'individual';
      name: string;
      brand: string;
      price: number;
      imageUrl: string;
      rating: number;
    };

export function FeaturedProductCard(props: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { type } = props;
  
  // Extract properties based on prop type
  const name = type === 'full' ? props.product.name : props.name;
  const brand = type === 'full' ? props.product.category : props.brand; // Sử dụng category thay cho brand
  const price = type === 'full' ? props.product.price : props.price;
  const imageUrl = type === 'full' ? props.product.image : props.imageUrl; // Sử dụng image thay cho imageUrl
  const rating = type === 'full' ? props.product.rating : props.rating;
  const productId = type === 'full' ? props.product.id : null;
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', name);
  };
  return (
    <div 
      className="group relative overflow-hidden rounded-lg border cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProductClick(e as any);
        }
      }}
      aria-label={`View details for ${name}`}
    >
      <HoverCard>
        <div className="relative">
          <AspectRatio.Root ratio={1}>
            <div className="relative h-full w-full overflow-hidden">
              {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
              <HoverCardTrigger asChild>
                <div className="relative h-full">
                  <img
                    src={imageUrl}
                    alt={name}
                    className={`h-full w-full object-cover transition-all duration-300 ${
                      isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      objectPosition: 'center top',
                    }}
                    onLoad={handleImageLoad}
                  />
                  
                  {/* Product info overlay that appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{brand}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{rating}</span>
                      </div>
                    </div>
                    <h2 className="mt-1 text-base font-semibold line-clamp-1">{name}</h2>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">${price.toFixed(2)}</span>
                      <Button size="sm" variant="outline" onClick={handleAddToCart}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
            </div>
          </AspectRatio.Root>
        </div>

        <HoverCardContent
          side="right"
          align="start"
          className="w-[400px] p-4 bg-background rounded-lg shadow-lg border animate-[var(--animation-slide-up)]"
          sideOffset={5}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48">
              <img
                src={imageUrl}
                alt={name}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">{brand}</h3>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-muted-foreground">${price.toFixed(2)}</p>
              <Button size="sm" className="w-full mt-2" onClick={handleQuickView}>
                Quick View
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
