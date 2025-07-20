import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialFruits = [];

export default function FruitDashboardCard() {
  const [form, setForm] = useState({ name: '', price: '', amount: '' });
  const [fruits, setFruits] = useState(initialFruits);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddFruit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.amount) {
      setError('All fields are required.');
      return;
    }
    setFruits([...fruits, { ...form }]);
    setForm({ name: '', price: '', amount: '' });
    setError('');
  };

  return (
    <div className="dashboard-card-page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="dashboard-card-box"
      >
        <h2 className="dashboard-card-title">Add Fruit</h2>
        <form onSubmit={handleAddFruit} className="dashboard-card-form">
          <div className="dashboard-card-input-group">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="dashboard-card-input"
              placeholder=" "
              required
            />
            <label className="dashboard-card-label">
              <span role="img" aria-label="apple">🍎</span> Fruit Name
            </label>
          </div>
          <div className="dashboard-card-input-group">
            <span className="dashboard-card-price-icon">💰</span>
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="dashboard-card-input"
              placeholder=" "
              required
            />
            <label className="dashboard-card-label">
              Price ($)
            </label>
          </div>
          <div className="dashboard-card-input-group">
            <input
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              className="dashboard-card-input"
              placeholder=" "
              required
            />
            <label className="dashboard-card-label">
              <span role="img" aria-label="kiwi">🥝</span> Amount
            </label>
            <span className="dashboard-card-amount-unit">kg</span>
          </div>
          {error && <div className="dashboard-card-error">{error}</div>}
          <div className="dashboard-card-btn-group">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(59,130,246,0.18)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="dashboard-card-btn"
            >
              Add Fruit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(59,130,246,0.10)' }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="dashboard-card-btn-alt"
              onClick={() => document.getElementById('fruit-list')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Fruit List
            </motion.button>
          </div>
        </form>
        <hr className="dashboard-card-divider" />
        <div id="fruit-list" className="dashboard-card-list-section">
          <h3 className="dashboard-card-list-label">Fruit List</h3>
          {fruits.length === 0 ? (
            <div className="dashboard-card-empty">No fruits added yet.</div>
          ) : (
            <ul className="dashboard-card-list">
              {fruits.map((fruit, i) => (
                <li key={i} className="dashboard-card-list-item">
                  <span className="dashboard-card-list-value"><span role="img" aria-label="apple">🍎</span> {fruit.name}</span>
                  <span className="dashboard-card-list-value">${fruit.price}</span>
                  <span className="dashboard-card-list-value">{fruit.amount} <span role="img" aria-label="kiwi">🥝</span> kg</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
} 