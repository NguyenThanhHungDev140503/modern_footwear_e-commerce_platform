import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/types/product';
import { SkeletonProductDetail } from '@/components/SkeletonLoader';
import { ProductDetail } from '@/components/productDetail/ProductDetail';

const products: Product[] = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG",
    price: 180,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
    description: "The Air Jordan 1 Retro High OG is a classic basketball shoe that has been a favorite among sneakerheads for years. It features a high-top design with a padded collar and a durable leather upper. The shoe is known for its iconic Jumpman logo on the tongue and the Air Jordan logo on the heel. The Air Jordan 1 Retro High OG is available in a variety of colorways and is a must-have for any sneaker enthusiast.",
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Black",
    category: "Sneaker",
    tags: ["Men", "Women"],
  },
  {
    id: "2",
    name: "Yeezy Boost 350 V2",
    price: 220,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.7,
    description: "The Adidas Yeezy Boost 350 V2 is a popular lifestyle shoe designed by Kanye West. It features a Primeknit upper for breathability and flexibility, with the signature SPLY-350 branding on the side. The Boost technology in the midsole provides responsive cushioning for all-day comfort.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    color: "Grey",
    category: "Sneaker",
    tags: ["Men", "Women"],
  },
  {
    id: "3",
    name: "Classic Leather",
    price: 90,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.5,
    description: "The Reebok Classic Leather is a timeless sneaker that has been a staple in the footwear industry since its debut in 1983. It features a soft leather upper for durability and comfort, with a die-cut EVA midsole for lightweight cushioning. The Classic Leather is perfect for everyday wear and can be paired with a variety of outfits.",
    sizes: [6, 7, 8, 9, 10, 11],
    color: "White",
    category: "Sneaker",
    tags: ["Men", "Women", "New Release"],
  },
  {
    id: "4",
    name: "Chuck Taylor All Star",
    price: 65,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.3,
    description: "The Converse Chuck Taylor All Star is an iconic basketball shoe that has become a cultural phenomenon. It features a canvas upper with the signature rubber toe cap and All Star ankle patch. The Chuck Taylor All Star is known for its versatility and has been worn by athletes, musicians, and fashion enthusiasts for decades.",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    color: "Black",
    category: "Sneaker",
    tags: ["Men", "Women", "Classic", "New Release"],
  },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  });

  const product = products.find((p) => p.id === id);
  
  if (isLoading) {
    return <SkeletonProductDetail />;
  }
  
  if (!product) {
    return <div className="container py-8 text-center">Sản phẩm không tồn tại</div>;
  }

  const isNewRelease = product.tags.includes("New Release");

  const handleAddToCart = () => {
    alert(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    // Navigate to checkout instead of using window.location
    alert(`Chuyển đến trang thanh toán cho ${product.name}`);
  };

  const handleAddToWishlist = () => {
    alert(`Đã thêm ${product.name} vào yêu thích`);
  };


  return (
    <div className="container py-8">
      <ProductDetail
        product={product}
        isNewRelease={isNewRelease}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
}
