'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, User, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));

    fetch('/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Failed to fetch orders:', err));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My Account
            </h1>
            <p className="text-lg text-gray-700">
              Welcome back, {user.name}!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'orders'
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Package size={20} className="inline mr-2" />
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={20} className="inline mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={20} className="inline mr-2" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            <div className="md:col-span-3">
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package size={64} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <button
                        onClick={() => router.push('/catalog')}
                        className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold text-gray-800">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-sm text-gray-700">
                                {item.name} x{item.quantity} - {item.size}
                              </p>
                            ))}
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t">
                            <span className="text-gray-700">Total</span>
                            <span className="text-xl font-bold text-pink-600">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Account Type
                      </label>
                      <input
                        type="text"
                        value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50"
                      />
                    </div>
                  </div>
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
