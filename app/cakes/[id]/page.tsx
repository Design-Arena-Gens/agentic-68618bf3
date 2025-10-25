'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  flavor: string;
  occasion: string;
  sizes: { size: string; servings: number; priceMultiplier: number }[];
  frostingOptions: string[];
  inStock: boolean;
}

export default function CakeDetail() {
  const params = useParams();
  const router = useRouter();
  const [cake, setCake] = useState<Cake | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFrosting, setSelectedFrosting] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/cakes/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setCake(data);
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0].size);
          }
          if (data.frostingOptions && data.frostingOptions.length > 0) {
            setSelectedFrosting(data.frostingOptions[0]);
          }
        });
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!cake) return;

    const sizeData = cake.sizes.find(s => s.size === selectedSize);
    const finalPrice = cake.price * (sizeData?.priceMultiplier || 1);

    const cartItem = {
      cakeId: cake.id,
      name: cake.name,
      quantity,
      size: selectedSize,
      frosting: selectedFrosting,
      message: customMessage,
      price: finalPrice
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    router.push('/cart');
  };

  const nextImage = () => {
    if (cake) {
      setCurrentImageIndex((prev) => (prev + 1) % cake.images.length);
    }
  };

  const prevImage = () => {
    if (cake) {
      setCurrentImageIndex((prev) => (prev - 1 + cake.images.length) % cake.images.length);
    }
  };

  if (!cake) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const sizeData = cake.sizes.find(s => s.size === selectedSize);
  const finalPrice = cake.price * (sizeData?.priceMultiplier || 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <div className="text-9xl">🎂</div>
                {cake.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {cake.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-md flex-shrink-0 ${
                      currentImageIndex === index ? 'ring-2 ring-pink-600' : ''
                    } bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center`}
                  >
                    <span className="text-2xl">🎂</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{cake.name}</h1>
              <p className="text-gray-600 mb-6">{cake.description}</p>
              
              <div className="flex gap-4 mb-6">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                  {cake.flavor}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {cake.occasion}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {cake.category}
                </span>
              </div>

              <div className="text-3xl font-bold text-pink-600 mb-6">
                ${finalPrice.toFixed(2)}
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="size-select" className="block text-sm font-semibold text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    id="size-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {cake.sizes.map(size => (
                      <option key={size.size} value={size.size}>
                        {size.size} - Serves {size.servings} (${(cake.price * size.priceMultiplier).toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="frosting-select" className="block text-sm font-semibold text-gray-700 mb-2">
                    Frosting
                  </label>
                  <select
                    id="frosting-select"
                    value={selectedFrosting}
                    onChange={(e) => setSelectedFrosting(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {cake.frostingOptions.map(frosting => (
                      <option key={frosting} value={frosting}>
                        {frosting}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="custom-message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Custom Message (Optional)
                  </label>
                  <input
                    id="custom-message"
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g., Happy Birthday Sarah!"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    maxLength={50}
                  />
                  <p className="text-xs text-gray-500 mt-1">{customMessage.length}/50 characters</p>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!cake.inStock}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md text-lg font-semibold transition-colors ${
                    cake.inStock
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {cake.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
