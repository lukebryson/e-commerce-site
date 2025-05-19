import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, ProductWithSuppliers } from '@shared/schema';
import { getCart, saveCart } from '@/lib/cartStorage';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductWithSuppliers) => Promise<void>;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => Promise<void>;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = getCart();
    if (savedCart && savedCart.length > 0) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = async (product: ProductWithSuppliers) => {
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Product exists in cart, increment quantity
      const existingItem = cartItems[existingItemIndex];
      
      // Check if we can increment (stock limit)
      if (existingItem.quantity >= product.UnitsInStock) {
        toast({
          title: "Maximum stock reached",
          description: `Only ${product.UnitsInStock} units available in stock.`,
          variant: "destructive",
        });
        return;
      }
      
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      setCartItems(updatedItems);
      
      toast({
        title: "Quantity updated",
        description: `You now have ${existingItem.quantity + 1} of ${product.ProductName} in your cart.`,
      });
    } else {
      // Product is not in cart, add it
      const newItem: CartItem = {
        id: product.id,
        productName: product.ProductName,
        unitPrice: product.UnitPrice,
        quantity: 1,
        supplierName: product.Suppliers[0].CompanyName,
        maxQuantity: product.UnitsInStock,
      };
      
      setCartItems([...cartItems, newItem]);
      
      toast({
        title: "Added to cart",
        description: `${product.ProductName} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const incrementQuantity = async (productId: number) => {
    const itemIndex = cartItems.findIndex((item) => item.id === productId);
    
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      
      // Check current stock before incrementing
      try {
        const response = await apiRequest('GET', `/api/products/${productId}`);
        const product = await response.json();
        
        if (item.quantity >= product.UnitsInStock) {
          toast({
            title: "Maximum stock reached",
            description: `Only ${product.UnitsInStock} units available in stock.`,
            variant: "destructive",
          });
          return;
        }
        
        // Update max quantity from the server
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1,
          maxQuantity: product.UnitsInStock,
        };
        
        const updatedItems = [...cartItems];
        updatedItems[itemIndex] = updatedItem;
        
        setCartItems(updatedItems);
      } catch (error) {
        toast({
          title: "Error",
          description: "Couldn't update quantity. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const decrementQuantity = (productId: number) => {
    const itemIndex = cartItems.findIndex((item) => item.id === productId);
    
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      
      if (item.quantity > 1) {
        const updatedItems = [...cartItems];
        updatedItems[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
        };
        
        setCartItems(updatedItems);
      } else {
        // Remove item if quantity would become 0
        removeFromCart(productId);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        cartTotal,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
