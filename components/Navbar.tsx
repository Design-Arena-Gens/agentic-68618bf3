'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Sweet Delights
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              Home
            </Link>
            <Link href="/catalog" className="text-gray-700 hover:text-pink-600 transition-colors">
              Catalog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link 
              href={isLoggedIn ? "/account" : "/login"} 
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="User account"
            >
              <User size={24} />
            </Link>
            <button
              className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
                Home
              </Link>
              <Link href="/catalog" className="text-gray-700 hover:text-pink-600 transition-colors">
                Catalog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
