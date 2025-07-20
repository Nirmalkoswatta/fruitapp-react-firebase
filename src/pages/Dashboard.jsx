import React, { useState } from 'react';
import { auth } from '../firebase';

export default function Dashboard() {
  const [form, setForm] = useState({ name: '', price: '', amount: '' });
  const [fruits, setFruits] = useState([]);
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
    <div className="dashboard-page">
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      {/* Navbar */}
      <div className="dashboard-navbar">
        <h2 className="dashboard-title">Fruit Dashboard</h2>
        <button
          onClick={() => auth.signOut()}
          className="dashboard-logout"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleAddFruit} className="dashboard-form">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="dashboard-input"
          placeholder="Fruit Name"
          required
        />
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          className="dashboard-input"
          placeholder="Price"
          required
        />
        <input
          name="amount"
          type="number"
          min="0"
          value={form.amount}
          onChange={handleChange}
          className="dashboard-input"
          placeholder="Amount"
          required
        />
        <button
          type="submit"
          className="dashboard-add-btn"
        >
          Add Fruit
        </button>
      </form>
      <h3 className="dashboard-list-label">Fruit List</h3>
      {fruits.length === 0 ? (
        <div className="dashboard-empty">No fruits added yet.</div>
      ) : (
        <ul className="dashboard-list">
          {fruits.map((fruit, i) => (
            <li key={i} className="dashboard-list-item">
              <span className="dashboard-list-value">{fruit.name}</span>
              <span className="dashboard-list-value">${fruit.price}</span>
              <span className="dashboard-list-value">{fruit.amount} kg</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 