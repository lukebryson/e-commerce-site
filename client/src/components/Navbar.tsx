import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems, openCart } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-primary cursor-pointer">ShopEase</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <span className={`${location === '/' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}>
                  Home
                </span>
              </Link>
              <Link href="/products">
                <span className={`${location === '/products' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}>
                  Products
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {cartItemCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="p-2 rounded-full text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary relative"
                onClick={openCart}
              >
                <span className="sr-only">View shopping cart</span>
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/">
            <span className={`${location === '/' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} block pl-3 pr-4 py-2 text-base font-medium cursor-pointer`}>
              Home
            </span>
          </Link>
          <Link href="/products">
            <span className={`${location === '/products' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} block pl-3 pr-4 py-2 text-base font-medium cursor-pointer`}>
              Products
            </span>
          </Link>
          {cartItemCount > 0 && (
            <button 
              className="flex items-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full pl-3 pr-4 py-2 text-base font-medium"
              onClick={openCart}
            >
              <span>Shopping Cart</span>
              <span className="ml-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
