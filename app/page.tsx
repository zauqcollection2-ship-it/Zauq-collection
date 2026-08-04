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
  User,
  LogIn,
  UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
    { name: "Men's Collection", color: 'from-purple-900 to-indigo-900', count: 124 },
    { name: "Women's Collection", color: 'from-pink-900 to-rose-900', count: 156 },
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
            <Link href="/" className="text-2xl font-bold tracking-wider">
              <span className="text-gold">ZAUQ</span>
              <span className="ml-1 text-sm font-light text-white">COLLECTION</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <Link key={item} href="#" className="text-sm hover:text-yellow-500 transition">
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
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
              
              {/* Auth Buttons - BOTH Sign In AND Sign Up */}
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login" className="px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold hover:bg-yellow-400 transition flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-4 py-2 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
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
                <Link key={item} href="#" className="text-sm hover:text-yellow-500 transition">{item}</Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                <Link href="/auth/login" className="px-6 py-3 bg-yellow-500 text-black rounded-full text-center font-semibold hover:bg-yellow-400 transition">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-6 py-3 border border-white/30 text-white rounded-full text-center font-semibold hover:bg-white/10 transition">
                  Create Account
                </Link>
              </div>
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
              <Link href="#" className="px-8 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition">
                Shop Now
              </Link>
              <Link href="#" className="px-8 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition">
                Explore Collection
              </Link>
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
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              <span className="px-4 py-2 bg-red-500/20 text-red-500 text-sm font-medium rounded-full">🔥 Limited Time</span>
              <div className="flex items-center space-x-3 text-2xl font-bold">
                <span className="bg-white/10 px-4 py-2 rounded-lg">12</span>
                <span className="text-yellow-500">:</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">34</span>
                <span className="text-yellow-500">:</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">56</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Flash <span className="text-gold">Sale</span>
            </h2>
            <p className="text-gray-400 mt-4">Grab these deals before they're gone</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSale.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/50 transition group relative"
              >
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-50%</div>
                <div className="h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{product.category}</p>
                  <h3 className="font-semibold mt-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xl font-bold text-red-500">₹{product.price.toLocaleString()}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{product.discount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition group-hover:scale-110"
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

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 bg-gradient-to-b from-zinc-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our <span className="text-gold">Customers Say</span>
            </h2>
            <p className="text-gray-400 mt-4">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Subscribe to Our <span className="text-gold">Newsletter</span>
            </h2>
            <p className="text-gray-400 mt-4 mb-8">Stay updated with our latest collections and exclusive offers</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed!'); }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                required
              />
              <button type="submit" className="px-8 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy</p>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link href="/" className="text-2xl font-bold">
                <span className="text-gold">ZAUQ</span>
                <span className="ml-1 text-sm font-light text-white">COLLECTION</span>
              </Link>
              <p className="text-gray-500 text-sm mt-4">Premium Pakistani fashion for the discerning individual. Where tradition meets modernity.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition">📱</a>
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition">📸</a>
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition">▶️</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">FAQ</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">Shipping Policy</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">Men</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">Women</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">New Arrivals</a></li>
                <li><a href="#" className="text-gray-500 hover:text-yellow-500 transition">Sale</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-3 text-gray-500">
                  <span>📞</span>
                  <a href="tel:+923490656865" className="hover:text-yellow-500 transition">0349-0656865</a>
                </li>
                <li className="flex items-center space-x-3 text-gray-500">
                  <span>💬</span>
                  <a href="https://wa.me/923490656865" target="_blank" className="hover:text-yellow-500 transition">WhatsApp</a>
                </li>
                <li className="flex items-center space-x-3 text-gray-500">
                  <span>✉️</span>
                  <a href="mailto:info@zauqcollection.com" className="hover:text-yellow-500 transition">info@zauqcollection.com</a>
                </li>
                <li className="flex items-center space-x-3 text-gray-500">
                  <span>📍</span>
                  <span>Lahore, Pakistan</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 ZAUQ COLLECTION. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-yellow-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-500 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923490656865"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition flex items-center gap-2"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline">Chat with us</span>
      </a>
    </div>
  );
}