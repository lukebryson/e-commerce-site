import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const WelcomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800"
            alt="Modern retail store interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to ShopEase
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your premium shopping destination for quality products. We pride
            ourselves on offering exceptional service and curated selections.
          </p>
          <div className="mt-10">
            <Link href="/products">
              <Button variant="outline" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Browse Products
              </Button>
            </Link>
            <Link href="#about">
              <Button size="lg" className="ml-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Shop With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              We've been in business since 2010, providing quality products and
              exceptional service to our customers.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Fast Shipping
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      All orders are shipped within 24 hours and delivered within
                      2-3 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Easy Returns
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Not satisfied with your purchase? Return within 30 days for
                      a full refund.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Secure Payments
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      All transactions are secure and your data is protected with
                      industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Check out some of our most popular items.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Chai Tea Package"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Chai</h3>
                <p className="mt-1 text-gray-600">$18.00</p>
                <div className="mt-4">
                  <Link href="/products">
                    <Button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Fruit Syrup Bottle"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Aniseed Syrup
                </h3>
                <p className="mt-1 text-gray-600">$10.00</p>
                <div className="mt-4">
                  <Link href="/products">
                    <Button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src="https://pixabay.com/get/ga4aa593ab876015f8bf2d5d245c2c979e76e5c0971bf287ceea3b7d2a832619c178efd8e42926f22f8f1ff845283d76db87e1369fda9996f47c4bce107e93797_1280.jpg"
                alt="Chef Anton's Seasoning"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chef Anton's Seasoning
                </h3>
                <p className="mt-1 text-gray-600">$22.00</p>
                <div className="mt-4">
                  <Link href="/products">
                    <Button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/products">
              <Button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
