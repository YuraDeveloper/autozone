import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, isDrawerOpen, toggleDrawer, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toggleDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full sm:w-80 h-full bg-white shadow-lg z-50"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={toggleDrawer} className="text-gray-500 hover:text-black">×</button>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-12 px-1 py-0.5 border text-sm rounded"
                        min="1"
                      />
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t">
            <p className="mb-2 text-sm">Total: <span className="font-semibold">${total.toFixed(2)}</span></p>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
