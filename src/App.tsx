import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/home/page';
import CartPage from './app/cart/page';
import ProductDetailPage from '@/app/productDetail/page';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ProductGridPage from './app/productGrid/page';
import CheckoutPage from './app/checkout/page';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/men/sneakers" element={<ProductGridPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
