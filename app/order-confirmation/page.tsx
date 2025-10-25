'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Thank you for your order. We will send you a confirmation email shortly.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What happens next?</h2>
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Order Processing</h3>
                  <p className="text-gray-600">We will start preparing your cake order immediately.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Baking & Decoration</h3>
                  <p className="text-gray-600">Our expert bakers will craft your cake with care.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Delivery</h3>
                  <p className="text-gray-600">Your cake will be delivered to your address.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
