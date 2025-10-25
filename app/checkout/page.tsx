'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';
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

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      router.push('/cart');
    }
    setCartItems(cart);
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.street) newErrors.street = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode || !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Valid ZIP code is required';
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Valid expiry (MM/YY) is required';
    }
    if (!formData.cardCvc || formData.cardCvc.length !== 3) {
      newErrors.cardCvc = 'Valid CVC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * 0.08;
      const shipping = subtotal > 100 ? 0 : 15;
      const total = subtotal + tax + shipping;

      const orderData = {
        items: cartItems,
        total,
        shippingAddress: {
          id: Date.now().toString(),
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          isDefault: false
        }
      };

      if (token) {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          localStorage.removeItem('cart');
          router.push('/order-confirmation');
        } else {
          alert('Failed to create order. Please try again.');
        }
      } else {
        localStorage.removeItem('cart');
        router.push('/order-confirmation');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
              Checkout
            </h1>
            <p className="text-lg text-gray-700">
              Complete your order
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        required
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        id="street"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        required
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                          required
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          id="state"
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                          required
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        id="zipCode"
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        required
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        required
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                          required
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-semibold text-gray-700 mb-2">
                          CVC
                        </label>
                        <input
                          id="cardCvc"
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full border ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                          required
                        />
                        {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md text-lg font-semibold transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  <CreditCard size={24} />
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
