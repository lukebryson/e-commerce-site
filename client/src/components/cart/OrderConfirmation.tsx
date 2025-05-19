import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CustomerInfo } from '@shared/schema';
import { Link } from 'wouter';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  customerInfo: CustomerInfo | null;
}

export const OrderConfirmation = ({ isOpen, onClose, customerInfo }: OrderConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
          <div className="pointer-events-auto w-full max-w-md p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Order Successful!</h3>
                {customerInfo && (
                  <div className="mt-2 text-sm text-gray-500 text-left p-4 bg-gray-50 rounded-md">
                    <p className="font-medium text-center mb-2">Order Details</p>
                    <p>Name: {customerInfo.firstName} {customerInfo.lastName}</p>
                    <p>Email: {customerInfo.email}</p>
                    <p>Shipping Address: {customerInfo.address}, {customerInfo.city}, {customerInfo.postalCode}</p>
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for your order. Your order has been placed and will be processed soon.
                </p>
                <div className="mt-6">
                  <Link href="/products">
                    <Button 
                      className="w-full flex justify-center py-2 px-4"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
