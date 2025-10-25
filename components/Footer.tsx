import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-4">Sweet Delights</h3>
            <p className="text-gray-600 text-sm">
              Crafting delicious cakes for your special moments since 2020.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-pink-600 text-sm">Home</Link></li>
              <li><Link href="/catalog" className="text-gray-600 hover:text-pink-600 text-sm">Catalog</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-pink-600 text-sm">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-pink-600 text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-600 hover:text-pink-600 text-sm">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-pink-600 text-sm">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-pink-600 text-sm">Returns</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-pink-600 text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-600" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2024 Sweet Delights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
