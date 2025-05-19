import { useQuery } from '@tanstack/react-query';
import { ProductWithSuppliers } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsPage = () => {
  const { addToCart } = useCart();
  
  const { data: products, isLoading, error } = useQuery<ProductWithSuppliers[]>({
    queryKey: ['/api/products'],
  });

  const handleAddToCart = async (product: ProductWithSuppliers) => {
    await addToCart(product);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Products</h1>
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Products</h1>
        <div className="text-center text-red-500">
          <p>An error occurred while fetching products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products?.map((product) => (
          <div key={product.id} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={getProductImage(product.id)}
                alt={product.ProductName}
                className="w-full h-48 object-center object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.ProductName}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.Suppliers[0].CompanyName}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.UnitPrice.toFixed(2)}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                In Stock: <span className="font-medium">{product.UnitsInStock}</span>
              </p>
            </div>
            <Button 
              className="mt-3 w-full"
              onClick={() => handleAddToCart(product)}
              disabled={product.UnitsInStock === 0}
            >
              {product.UnitsInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get product images based on ID
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

export default ProductsPage;
