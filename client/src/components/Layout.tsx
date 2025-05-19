import { Outlet } from 'wouter';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ShoppingCart } from './cart/ShoppingCart';
import { Checkout } from './cart/Checkout';
import { OrderConfirmation } from './cart/OrderConfirmation';
import { Toast } from './Toast';
import { useState } from 'react';
import { CustomerInfo } from '@shared/schema';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleOrderComplete = (customer: CustomerInfo) => {
    setIsCheckoutOpen(false);
    setCustomerInfo(customer);
    setIsOrderConfirmationOpen(true);
  };

  const handleCloseOrderConfirmation = () => {
    setIsOrderConfirmationOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        {children}
      </main>
      <Footer />
      <ShoppingCart onCheckout={handleCheckout} />
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={handleCloseCheckout} 
        onComplete={handleOrderComplete} 
      />
      <OrderConfirmation 
        isOpen={isOrderConfirmationOpen} 
        onClose={handleCloseOrderConfirmation} 
        customerInfo={customerInfo}
      />
      <Toast />
    </div>
  );
};
