import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, Minus, Plus } from 'lucide-react';

interface ShoppingCartProps {
  onCheckout: () => void;
}

export const ShoppingCart = ({ onCheckout }: ShoppingCartProps) => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    incrementQuantity, 
    decrementQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-20">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={closeCart}
        ></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={closeCart}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cartItems.length === 0 ? (
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        <li className="py-6 text-center text-gray-500">
                          <div className="flex flex-col items-center space-y-2">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                            <p>Your cart is empty</p>
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={closeCart}
                            >
                              Browse Products
                            </Button>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={getProductImage(item.id)}
                                alt={item.productName}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.productName}</h3>
                                  <p className="ml-4">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.supplierName}</p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center border rounded">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => decrementQuantity(item.id)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => incrementQuantity(item.id)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="flex">
                                  <Button
                                    variant="ghost"
                                    className="font-medium text-primary hover:text-primary/90"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button
                      className="w-full flex justify-center"
                      onClick={onCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{" "}
                      <Button
                        variant="link"
                        className="text-primary font-medium hover:text-primary/90"
                        onClick={closeCart}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </Button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get product images
const getProductImage = (id: number): string => {
  const imageMap: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800", // Chai
    2: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800", // Aniseed Syrup
    3: "https://pixabay.com/get/gd40d38ec9970d061743eed5c978a8ab83876c8e7675ffe9d585f29de75f62675bcca72a7655e72e6beef0003ea237432c3a2366dd543b137a5452ee46d30148b_1280.jpg", // Chef Anton's Seasoning
    4: "https://pixabay.com/get/gef4cbebd831e2dc1caacc917bad1d16b21329dcac4c864760240ea033726ab91c2622f01740d76112dff759ccc27f826e40fceae1d4bffc778d042d0e6f1f5b2_1280.jpg", // Grandma's Boysenberry Spread
    5: "https://pixabay.com/get/ge6a6a7a49fbb4f0a5fa13bf65c0ebd2d748dcf6e5aafa1a04fd0651dbcabc70c0fb1542223c75a1432d18ac922ca83c685098a1f00d3a08fb9897ca3dc1b5075_1280.jpg", // Singapore Noodles
    6: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800", // Gnocchi di nonna Alice
    7: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800", // Organic Earl Grey Tea
    8: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800", // Aged Parmesan Cheese
  };
  
  return imageMap[id] || "https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"; // Default image
};
