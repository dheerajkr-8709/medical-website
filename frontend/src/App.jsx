import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageContext';

// Layout and Common Components
const Navbar = lazy(() => import('./components/layout/Navbar'));
const Footer = lazy(() => import('./components/layout/Footer'));
const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
    />
  </div>
);

// Pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ReturnRefund = lazy(() => import('./pages/ReturnRefund'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminMedicines = lazy(() => import('./pages/admin/ManageMedicines'));
const AdminOrders = lazy(() => import('./pages/admin/ManageOrders'));

const BottomNav = lazy(() => import('./components/layout/BottomNav'));
const FloatingWhatsApp = lazy(() => import('./components/layout/FloatingWhatsApp'));

function App() {
  const shopNumber = "+919113766681"; // Replace with actual Shop Number

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col selection:bg-primary-100 selection:text-primary-700">
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/return-refund" element={<ReturnRefund />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/medicines" element={<AdminMedicines />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <BottomNav />
          <FloatingWhatsApp />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}

export default App;
