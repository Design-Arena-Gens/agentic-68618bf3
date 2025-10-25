'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
}

export default function Home() {
  const [featuredCakes, setFeaturedCakes] = useState<Cake[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/cakes')
      .then(res => res.json())
      .then(data => setFeaturedCakes(data.filter((c: Cake) => c.featured).slice(0, 3)));

    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section 
          className="relative bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-20 px-4"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Delicious Cakes for Every Occasion
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Handcrafted with love, baked to perfection. Order your dream cake today!
            </p>
            <Link 
              href="/catalog"
              className="inline-flex items-center bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors shadow-lg"
            >
              Browse Our Cakes
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        <section className="py-16 px-4" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Featured Cakes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCakes.map(cake => (
                <Link 
                  key={cake.id} 
                  href={`/cakes/${cake.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-64 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                    <div className="text-6xl">🎂</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{cake.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{cake.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-600">${cake.price.toFixed(2)}</span>
                      <span className="text-pink-600 font-semibold">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 px-4" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">{testimonial.comment}</p>
                  <p className="text-gray-800 font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Order Your Perfect Cake?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Browse our full catalog and customize your cake exactly how you want it.
            </p>
            <Link 
              href="/catalog"
              className="inline-flex items-center bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
