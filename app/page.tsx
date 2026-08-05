'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: 'Premium Kurta', price: '₹3,999', original: '₹5,999', category: 'Men' },
    { id: 2, name: 'Embroidered Shawl', price: '₹2,499', original: '₹3,999', category: 'Women' },
    { id: 3, name: 'Designer Waistcoat', price: '₹5,499', original: '₹7,999', category: 'Men' },
    { id: 4, name: 'Luxury Dupatta', price: '₹1,999', original: '₹3,499', category: 'Women' },
  ];

  const handleAddToCart = (product: any) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============ HEADER ============ */}
      <header className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span className="text-gold">ZAUQ</span>
              <span className="ml-1 text-sm font-light text-white/70">COLLECTION</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <Link key={item} href="#" className="text-sm text-white/70 hover:text-gold transition">
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <a href="tel:+923490656865" className="hidden lg:flex items-center space-x-2 text-sm text-white/50 hover:text-gold transition">
                <span>📞</span>
                <span>0349-0656865</span>
              </a>
              
              <Link href="/auth/login" className="px-4 py-2 bg-gold text-black rounded-full text-sm font-semibold hover:bg-gold/80 transition">
                Sign In
              </Link>
              <Link href="/auth/register" className="px-4 py-2 border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition">
                Sign Up
              </Link>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              {['Home', 'Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <Link key={item} href="#" className="text-white/70 hover:text-gold transition py-2">
                  {item}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a href="tel:+923490656865" className="text-white/50 hover:text-gold transition">
                  📞 0349-0656865
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-gold/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 border border-gold text-gold text-xs tracking-widest uppercase rounded-full mb-6">
              Fall/Winter Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gold">Elevate Your</span>
              <br />
              <span className="text-white">Style With</span>
              <br />
              <span className="text-gold">ZAUQ</span>
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-lg">
              Discover the perfect blend of tradition and modernity. Premium Pakistani fashion crafted for the discerning individual.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="#" className="px-8 py-3 bg-gold text-black rounded-full font-semibold hover:bg-gold/80 transition">
                Shop Now
              </Link>
              <Link href="#" className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition">
                Explore Collection
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-white/40">
              <span>✦ Premium Quality</span>
              <span>✦ Free Shipping Over ₹5,000</span>
              <span>✦ Cash on Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="text-gold">Products</span>
            </h2>
            <p className="text-gray-500 mt-2">Handpicked premium fashion pieces</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-gold/50 transition group">
                <div className="h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-5xl">
                  ✦
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h3 className="font-semibold mt-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-gold">{product.price}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">{product.original}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-gold/20 text-gold rounded-full hover:bg-gold hover:text-black transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our <span className="text-gold">Customers Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ayesha Khan', location: 'Lahore', text: 'Absolutely stunning collection! The quality is unmatched.' },
              { name: 'Usman Ali', location: 'Karachi', text: 'Premium quality fabric and perfect fit. Highly recommend!' },
              { name: 'Sana Ahmed', location: 'Islamabad', text: 'Beautiful designs and fast shipping. Excellent service!' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold">
              Subscribe to Our <span className="text-gold">Newsletter</span>
            </h2>
            <p className="text-gray-500 mt-2 mb-6">Stay updated with our latest collections and exclusive offers</p>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed!'); }} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                required
              />
              <button type="submit" className="px-8 py-3 bg-gold text-black rounded-full font-semibold hover:bg-gold/80 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold">
                <span className="text-gold">ZAUQ</span>
                <span className="ml-1 text-sm font-light text-white/70">COLLECTION</span>
              </Link>
              <p className="text-gray-500 text-sm mt-4">Premium Pakistani fashion since 2024.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-gold transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-gold transition">Contact</Link></li>
                <li><Link href="#" className="hover:text-gold transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-gold transition">Men</Link></li>
                <li><Link href="#" className="hover:text-gold transition">Women</Link></li>
                <li><Link href="#" className="hover:text-gold transition">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="tel:+923490656865" className="hover:text-gold transition">📞 0349-0656865</a></li>
                <li><a href="https://wa.me/923490656865" target="_blank" className="hover:text-gold transition">💬 WhatsApp</a></li>
                <li><a href="mailto:info@zauqcollection.com" className="hover:text-gold transition">✉️ Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 ZAUQ COLLECTION. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ============ FLOATING WHATSAPP ============ */}
      <a
        href="https://wa.me/923490656865"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition flex items-center gap-2"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}