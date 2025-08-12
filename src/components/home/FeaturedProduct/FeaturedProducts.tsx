import { Product } from "@/types/product"
import { FeaturedProductCard } from "./FeaturedProductCard"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({products}:FeaturedProductsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Featured Sneakers</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} type="full" product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
