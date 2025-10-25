'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, Users, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Cake {
  id: string;
  name: string;
  price: number;
  category: string;
  flavor: string;
  inStock: boolean;
}

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/account');
      return;
    }

    setUser(parsedUser);

    Promise.all([
      fetch('/api/admin/cakes', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json()),
      fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
    ])
      .then(([cakesData, ordersData]) => {
        setCakes(cakesData);
        setOrders(ordersData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setIsLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
      }
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const handleToggleStock = async (cakeId: string, currentStock: boolean) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/admin/cakes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cakeId, inStock: !currentStock })
      });

      if (response.ok) {
        const updatedCake = await response.json();
        setCakes(cakes.map(c => c.id === cakeId ? updatedCake : c));
      }
    } catch (err) {
      console.error('Failed to update cake:', err);
    }
  };

  if (isLoading || !user) {
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

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalProducts: cakes.length
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-700">
              Manage your cake shop
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                </div>
                <Package size={40} className="text-pink-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.pendingOrders}</p>
                </div>
                <ShoppingBag size={40} className="text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800">${stats.totalRevenue.toFixed(0)}</p>
                </div>
                <Users size={40} className="text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                </div>
                <ShoppingBag size={40} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex gap-4 mb-6 border-b">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'inventory'
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Inventory
              </button>
            </div>

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="px-4 py-3 text-sm text-gray-800">#{order.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {order.items.length} item(s)
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                order.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'processing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inventory' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Flavor</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cakes.map(cake => (
                        <tr key={cake.id}>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">{cake.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{cake.category}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{cake.flavor}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">${cake.price.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              cake.inStock
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {cake.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleToggleStock(cake.id, cake.inStock)}
                              className="text-sm text-pink-600 hover:text-pink-700 font-semibold"
                            >
                              Toggle Stock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
