import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Engine Parts',
    image: 'https://via.placeholder.com/300x200?text=Engine+Parts',
    link: '/catalog?category=engine'
  },
  {
    title: 'Tuning & Performance',
    image: 'https://via.placeholder.com/300x200?text=Tuning+%26+Performance',
    link: '/catalog?category=tuning'
  },
  {
    title: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=Accessories',
    link: '/catalog?category=accessories'
  }
];

const Home = () => {
  return (
    <section className="p-6 text-center">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to AutoZone Parts
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your one-stop shop for car parts, performance tuning, and auto accessories.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Link
          to="/catalog"
          className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mb-10"
        >
          Browse Catalog
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.4 }}
          >
            <Link
              to={cat.link}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden block"
            >
              <img src={cat.image} alt={cat.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{cat.title}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home;