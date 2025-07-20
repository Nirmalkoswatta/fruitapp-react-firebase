import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FruitForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', price: 0, amount: 0 });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      setError('Fruit name is required');
      return;
    }
    setError('');
    onAdd(form);
    setForm({ name: '', price: 0, amount: 0 });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="fruit-form"
    >
      <h2 className="fruit-form-title">Add Fruit</h2>
      {error && <div className="fruit-form-error">{error}</div>}
      <div>
        <label className="fruit-form-label">
          <span role="img" aria-label="apple">🍎</span> Fruit Name
        </label>
        <div className="fruit-form-input-wrapper">
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="fruit-form-input"
            placeholder="e.g. Apple"
            required
          />
          <span className="fruit-form-amount">🍏</span>
        </div>
      </div>
      <div>
        <label className="fruit-form-label">
          <span className="fruit-form-price">$</span> Price
        </label>
        <div className="fruit-form-input-wrapper">
          <span className="fruit-form-price">$</span>
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            className="fruit-form-input"
            placeholder="0"
            required
          />
        </div>
      </div>
      <div>
        <label className="fruit-form-label">
          <span role="img" aria-label="banana">🍌</span> Amount
        </label>
        <div className="fruit-form-input-wrapper">
          <input
            name="amount"
            type="number"
            min="0"
            value={form.amount}
            onChange={handleChange}
            className="fruit-form-input"
            placeholder="0"
            required
          />
          <span className="fruit-form-amount">kg</span>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="fruit-form-btn"
      >
        Add Fruit
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fruit-form-view-btn"
        onClick={() => document.getElementById('fruit-list-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        🍇 View Fruit List
      </motion.button>
    </motion.form>
  );
} 