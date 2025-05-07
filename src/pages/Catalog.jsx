import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockProducts = [
  {
    id: 1,
    name: 'High Performance Air Filter',
    category: 'engine',
    price: 29.99,
    available: true,
    image: 'https://via.placeholder.com/300x200?text=Air+Filter'
  },
  {
    id: 2,
    name: 'LED Headlight Conversion Kit',
    category: 'tuning',
    price: 89.99,
    available: false,
    image: 'https://via.placeholder.com/300x200?text=LED+Headlights'
  },
  {
    id: 3,
    name: 'Racing Spark Plugs Set',
    category: 'engine',
    price: 45.00,
    available: true,
    image: 'https://via.placeholder.com/300x200?text=Spark+Plugs'
  },
  {
    id: 4,
    name: 'Carbon Fiber Shift Knob',
    category: 'accessories',
    price: 24.99,
    available: true,
    image: 'https://via.placeholder.com/300x200?text=Shift+Knob'
  }
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceLimit, setPriceLimit] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');

  const categories = ['all', 'engine', 'tuning', 'accessories'];

  let filteredProducts = mockProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.price <= priceLimit)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (sortKey === 'price') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortKey === 'availability') {
    filteredProducts.sort((a, b) => b.available - a.available);
  }

  return (
    <section className="p-4 sm:p-6">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Product Catalog
      </motion.h1>

      <div className="mb-6 flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-4 py-2 rounded border text-sm sm:text-base ${selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black'} hover:bg-gray-200 transition`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border px-3 py-2 rounded text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded text-sm"
            onChange={e => setSortKey(e.target.value)}
            value={sortKey}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="availability">Availability</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label htmlFor="priceRange" className="text-sm">Max Price: ${priceLimit}</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100"
            step="1"
            value={priceLimit}
            onChange={e => setPriceLimit(Number(e.target.value))}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="border rounded shadow hover:shadow-lg transition"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-base font-bold text-green-600 mb-2">${product.price.toFixed(2)}</p>
              <p className={`text-sm mb-4 ${product.available ? 'text-green-500' : 'text-red-500'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="flex flex-col gap-2">
                <a href={`/product/${product.id}`} className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition text-center text-sm">
                  View Details
                </a>
                <button
                  onClick={() => alert('Use global addToCart here')}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;