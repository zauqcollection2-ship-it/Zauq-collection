'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, collection, getDocs, query, orderBy, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check admin access
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Check if user is admin (only zauqcollection2@gmail.com)
        if (user.email === 'zauqcollection2@gmail.com') {
          setIsAdmin(true);
          setLoading(false);
          fetchData();
        } else {
          setIsAdmin(false);
          setLoading(false);
          router.push('/');
          toast.error('Access denied. Admin only.');
        }
      } else {
        setLoading(false);
        router.push('/auth/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);

      // Fetch orders
      const ordersSnapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);

      // Calculate stats
      const totalRevenue = ordersData
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.total || 0), 0);
      
      const pendingOrders = ordersData.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      toast.success(`Order ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        toast.success('Product deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto"></div>
          <p className="text-white mt-4">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-400 mt-4">You don't have permission to access this page.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2 bg-gold text-black rounded-full">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <header className="bg-black/95 border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gold">ZAUQ Admin</h1>
            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={() => { auth.signOut(); router.push('/'); }}
              className="px-4 py-2 border border-white/20 text-white rounded-full text-sm hover:bg-white/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'products', 'orders', 'customers', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gold">{stats.totalProducts}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-blue-400">{stats.totalOrders}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-green-400">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.pendingOrders}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white">#{order.id?.slice(0, 8)}</td>
                        <td className="py-3 px-4 text-gray-400">{order.userEmail || 'Guest'}</td>
                        <td className="py-3 px-4 text-gold">₹{order.total?.toLocaleString() || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            order.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-white/10 text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-gold"
                            value={order.status || 'pending'}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <button
                onClick={() => {
                  const name = prompt('Product name:');
                  if (name) {
                    const price = prompt('Price:');
                    const description = prompt('Description:');
                    addDoc(collection(db, 'products'), {
                      name,
                      price: parseInt(price) || 0,
                      description,
                      createdAt: new Date().toISOString(),
                      stock: 10,
                    }).then(() => {
                      toast.success('Product added!');
                      fetchData();
                    });
                  }
                }}
                className="px-6 py-2 bg-gold text-black rounded-full font-semibold hover:bg-gold/80 transition"
              >
                + Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                  <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center text-4xl mb-4">
                    ✦
                  </div>
                  <h3 className="text-white font-bold">{product.name}</h3>
                  <p className="text-gold font-bold">₹{product.price?.toLocaleString() || 0}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-xs ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">All Orders</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">#{order.id?.slice(0, 8)}</td>
                      <td className="py-3 px-4 text-gray-400">{order.userEmail || 'Guest'}</td>
                      <td className="py-3 px-4 text-gray-400">{order.items?.length || 0}</td>
                      <td className="py-3 px-4 text-gold">₹{order.total?.toLocaleString() || 0}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-white/10 text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-gold"
                          value={order.status || 'pending'}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Total Revenue</h3>
                <p className="text-4xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-400 text-sm mt-2">From {stats.totalOrders} orders</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Average Order Value</h3>
                <p className="text-4xl font-bold text-white">
                  ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : 0}
                </p>
                <p className="text-gray-400 text-sm mt-2">Per order average</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Total Products</h3>
                <p className="text-4xl font-bold text-white">{stats.totalProducts}</p>
                <p className="text-gray-400 text-sm mt-2">Available in store</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-gold font-semibold mb-2">Pending Orders</h3>
                <p className="text-4xl font-bold text-white">{stats.pendingOrders}</p>
                <p className="text-gray-400 text-sm mt-2">Need attention</p>
              </div>
            </div>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Customers</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <div className="text-center py-12">
                <p className="text-gray-400">Customer management coming soon...</p>
                <p className="text-gray-500 text-sm mt-2">View customer details, purchase history, and more</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}