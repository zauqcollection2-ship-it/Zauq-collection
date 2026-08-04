'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ArrowRight, 
  Phone,
  Menu,
  X,
  Search,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample products
  const products = [
    { id: 1, name: 'Premium Kurta', price: 3999, discount: 5999, image: '✦', category: 'Men' },
    { id: 2, name: 'Embroidered Shawl', price: 2499, discount: 3999, image: '✦', category: 'Women' },
    { id: 3, name: 'Designer Waistcoat', price: 5499, discount: 7999, image: '✦', category: 'Men' },
    { id: 4, name: 'Luxury Dupatta', price: 1999, discount: 3499, image: '✦', category: 'Women' },
  ];

  const flashSale = [
    { id: 5, name: 'Premium Sherwani', price: 7499, discount: 14999, image: '✦', category: 'Men' },
    { id: 6, name: 'Embroidered Lehenga', price: 8999, discount: 14999, image: '✦', category: 'Women' },
    { id: 7, name: 'Designer Blazer', price: 6499, discount: 9999, image: '✦', category: 'Men' },
    { id: 8, name: 'Luxury Saree', price: 4499, discount: 8199, image: '✦', category: 'Women' },
  ];

  const categories = [
    { name: 'Men\'s Collection', color: 'from-purple-900 to-indigo-900', count: 124 },
    { name: 'Women\'s Collection', color: 'from-pink-900 to-rose-900', count: 156 },
    { name: 'New Arrivals', color: 'from-blue-900 to-cyan-900', count: 45 },
    { name: 'Best Sellers', color: 'from-amber-900 to-yellow-900', count: 32 },
  ];

  const testimonials = [
    { name: 'Ayesha Khan', location: 'Lahore', text: 'Absolutely stunning collection! The quality is unmatched.', rating: 5 },
    { name: 'Usman Ali', location: 'Karachi', text: 'Premium quality fabric and perfect fit. Highly recommend!', rating: 5 },
    { name: 'Sana Ahmed', location: 'Islamabad', text: 'Beautiful designs and fast shipping. Excellent service!', rating: 4 },
  ];

  const addToCart = (product: any) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============ HEADER ============ */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="text-2xl font-bold tracking-wider">
              <span className="text-gold">ZAUQ</span>
              <span className="ml-1 text-sm font-light text-white">COLLECTION</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <a key={item} href="#" className="text-sm hover:text-yellow-500 transition">
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <a href="tel:+923490656865" className="hidden md:flex items-center space-x-2 text-sm text-gray-400 hover:text-yellow-500 transition">
                <Phone className="h-4 w-4" />
                <span>0349-0656865</span>
              </a>
              <button className="p-2 rounded-full hover:bg-white/5 transition">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 transition relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full text-[10px] flex items-center justify-center text-black">3</span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 transition relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full text-[10px] flex items-center justify-center text-black">2</span>
              </button>
              <a href="/auth/login" className="hidden md:inline-block px-6 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold hover:bg-yellow-400 transition">
                Sign In
              </a>
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <a key={item} href="#" className="text-sm hover:text-yellow-500 transition">{item}</a>
              ))}
              <a href="/auth/login" className="px-6 py-2 bg-yellow-500 text-black rounded-full text-center font-semibold">Sign In</a>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 border border-yellow-500 text-yellow-500 text-xs tracking-widest uppercase rounded-full mb-6">
              Fall/Winter Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gold">Elevate Your</span><br />
              <span className="text-white">Style With</span><br />
              <span className="text-gold">ZAUQ</span>
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-lg">
              Discover the perfect blend of tradition and modernity. Premium Pakistani fashion crafted for the discerning individual.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#" className="px-8 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition">
                Shop Now
              </a>
              <a href="#" className="px-8 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition">
                Explore Collection
              </a>
            </div>
            <div className="flex items-center space-x-8 mt-12 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">✦</span>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">✦</span>
                <span>Free Shipping Over ₹5,000</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">✦</span>
                <span>Cash on Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Explore Our <span className="text-gold">Collections</span>
            </h2>
            <p className="text-gray-400 mt-4">Discover the latest trends in premium Pakistani fashion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${cat.color} group`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold">{cat.name}</h3>
                  <p className="text-gray-300 text-sm">{cat.count} Products</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="text-gold">Products</span>
            </h2>
            <p className="text-gray-400 mt-4">Our handpicked selection of premium fashion pieces</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-500/50 transition group"
              >
                <div className="h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{product.category}</p>
                  <h3 className="font-semibold mt-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xl font-bold text-yellow-500">₹{product.price.toLocaleString()}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{product.discount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition group-hover:scale-110"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FLASH SALE ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="px-4 py-2 bg-red-500/20 text-red-500 text-sm font-medium rounded-full">🔥 Limited Time</span>
              <div className="flex items-center space-x-3 text-2xl font-bold">
                <span className="bg-white/10