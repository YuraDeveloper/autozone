import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { toggleDrawer, cart } = useCart();

  return (
    <header className="bg-black text-white px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">AutoZone</Link>
      <nav className="flex items-center gap-4 text-sm md:text-base">
        <Link to="/catalog" className="hover:underline hidden sm:inline">Catalog</Link>
        <button onClick={toggleDrawer} className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;