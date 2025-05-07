import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="p-4 sm:p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600">We'll contact you soon at {form.email}.</p>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2 text-sm sm:text-base">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold mt-4 text-base">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border px-4 py-2 rounded text-sm"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border px-4 py-2 rounded text-sm"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          required
          className="w-full border px-4 py-2 rounded text-sm"
          rows="3"
          value={form.address}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm">
          Place Order
        </button>
      </form>
    </section>
  );
};

export default Checkout;
