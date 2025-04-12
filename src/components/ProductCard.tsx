import { Star } from "lucide-react"
import { Button } from "./ui/button"
import * as Tooltip from "@radix-ui/react-tooltip"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'
import { Skeleton } from './SkeletonLoader'
import { Product } from '@/types/product'
import { useState } from 'react'

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

export function ProductCard(props: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { type } = props;
  
  // Extract properties based on prop type
  const name = type === 'full' ? props.product.name : props.name;
  const brand = type === 'full' ? props.product.brand : props.brand;
  const price = type === 'full' ? props.product.price : props.price;
  const imageUrl = type === 'full' ? props.product.imageUrl : props.imageUrl;
  const rating = type === 'full' ? props.product.rating : props.rating;
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card">
      <HoverCard>
        <div className="relative">
          <AspectRatio.Root ratio={4/3}>
            <div className="relative h-full w-full overflow-hidden">
              {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
              <HoverCardTrigger asChild>
                <img
                  src={imageUrl}
                  alt={name}
                  className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={handleImageLoad}
                />
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
              <Button size="sm" className="w-full mt-2">Quick View</Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{brand}</h3>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{rating}</span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-foreground text-background px-2 py-1 rounded text-xs"
                  sideOffset={5}
                >
                  Customer Rating: {rating}/5
                  <Tooltip.Arrow className="fill-foreground" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <h2 className="mt-1 text-lg font-semibold line-clamp-1">{name}</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">${price.toFixed(2)}</span>
          <Button size="sm" variant="outline">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
