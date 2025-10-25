'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Filter } from 'lucide-react';
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
  inStock: boolean;
}

export default function Catalog() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([]);
  const [flavorFilter, setFlavorFilter] = useState('');
  const [occasionFilter, setOccasionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/cakes')
      .then(res => res.json())
      .then(data => {
        setCakes(data);
        setFilteredCakes(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...cakes];

    if (flavorFilter) {
      filtered = filtered.filter(c => c.flavor === flavorFilter);
    }
    if (occasionFilter) {
      filtered = filtered.filter(c => c.occasion === occasionFilter);
    }
    if (categoryFilter) {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCakes(filtered);
  }, [flavorFilter, occasionFilter, categoryFilter, sortBy, cakes]);

  const flavors = [...new Set(cakes.map(c => c.flavor))];
  const occasions = [...new Set(cakes.map(c => c.occasion))];
  const categories = [...new Set(cakes.map(c => c.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Cake Catalog
            </h1>
            <p className="text-lg text-gray-700">
              Browse our delicious selection of handcrafted cakes
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
                
                <div className="mb-6">
                  <label htmlFor="flavor-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Flavor
                  </label>
                  <select
                    id="flavor-filter"
                    value={flavorFilter}
                    onChange={(e) => setFlavorFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Flavors</option>
                    {flavors.map(flavor => (
                      <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="occasion-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select
                    id="occasion-filter"
                    value={occasionFilter}
                    onChange={(e) => setOccasionFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Occasions</option>
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="sort-by" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setFlavorFilter('');
                    setOccasionFilter('');
                    setCategoryFilter('');
                    setSortBy('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  Showing {filteredCakes.length} of {cakes.length} cakes
                </p>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  <Filter size={20} className="mr-2" />
                  Filters
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCakes.map(cake => (
                  <Link
                    key={cake.id}
                    href={`/cakes/${cake.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                      <div className="text-5xl">🎂</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{cake.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{cake.description}</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">{cake.flavor}</span>
                        <span className="text-xs text-gray-500">{cake.occasion}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-pink-600">${cake.price.toFixed(2)}</span>
                        {cake.inStock ? (
                          <span className="text-xs text-green-600 font-semibold">In Stock</span>
                        ) : (
                          <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredCakes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No cakes found matching your filters.</p>
                  <button
                    onClick={() => {
                      setFlavorFilter('');
                      setOccasionFilter('');
                      setCategoryFilter('');
                      setSortBy('');
                    }}
                    className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
