'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CartItem {
  cakeId: string;
  name: string;
  quantity: number;
  size: string;
  frosting: string;
  message?: string;
  price: number;
}

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cartItems];
    newCart[index].quantity = newQuantity;
    updateCart(newCart);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Shopping Cart
            </h1>
            <p className="text-lg text-gray-700">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
              <button
                onClick={() => router.push('/catalog')}
                className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors"
              >
                Browse Cakes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 py-4 border-b last:border-b-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🎂</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Frosting: {item.frosting}</p>
                        {item.message && (
                          <p className="text-sm text-gray-600">Message: {item.message}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-pink-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(index)}
                          className="mt-2 text-red-600 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {subtotal < 100 && (
                      <p className="text-xs text-gray-500">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-pink-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => router.push('/catalog')}
                    className="w-full mt-3 bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
