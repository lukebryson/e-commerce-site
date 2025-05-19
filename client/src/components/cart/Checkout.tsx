import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { X, Check } from 'lucide-react';
import { CustomerInfo, customerInfoSchema, OrderItem } from '@shared/schema';
import { useCart } from '@/hooks/useCart';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (customerInfo: CustomerInfo) => void;
}

export const Checkout = ({ isOpen, onClose, onComplete }: CheckoutProps) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  if (!isOpen) return null;

  const handleSubmit = async (data: CustomerInfo) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "You can't checkout with an empty cart.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderItems: OrderItem[] = cartItems.map(item => ({
        productId: item.id,
        productName: item.productName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.unitPrice * item.quantity,
      }));

      const orderData = {
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        customerAddress: data.address,
        customerCity: data.city,
        customerPostalCode: data.postalCode,
        totalAmount: cartTotal,
        orderDate: new Date().toISOString(),
        orderItems: orderItems,
      };

      // Submit order
      await apiRequest('POST', '/api/orders', orderData);

      // Clear cart and complete checkout
      clearCart();
      onComplete(data);
      
      toast({
        title: "Order submitted successfully",
        description: "Thank you for your purchase!",
      });
    } catch (error) {
      console.error('Failed to submit order:', error);
      toast({
        title: "Failed to submit order",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
          <div className="pointer-events-auto w-full max-w-lg">
            <div className="flex flex-col bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Checkout</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-4 py-6 sm:px-6 overflow-y-auto">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                      
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First name</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last name</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal code</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSubmitting} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                      
                      <dl className="mt-4 space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <dt className="text-sm text-gray-600">
                              {item.productName} ({item.quantity})
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </dd>
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                          <dt className="text-base font-medium text-gray-900">Total</dt>
                          <dd className="text-base font-medium text-gray-900">
                            ${cartTotal.toFixed(2)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-6">
                      <Button
                        type="submit"
                        className="w-full flex justify-center items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          "Complete Order"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
