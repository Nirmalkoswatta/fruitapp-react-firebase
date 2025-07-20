import React from 'react';
import { motion } from 'framer-motion';

const fruitIcons = ['🍎', '🍌', '🍍', '🍇', '🍉', '🍊', '🍓', '🍑', '🍒', '🥝'];

export default function FruitList({ fruits }) {
  return (
    <section id="fruit-list-section" className="fruit-list-section">
      <h3 className="fruit-list-title">Fruit List</h3>
      <div className="fruit-list-grid">
        {fruits.length === 0 && (
          <div className="fruit-list-empty">No fruits added yet.</div>
        )}
        {fruits.map((fruit, i) => (
          <motion.div
            key={fruit.id || i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, rotate: -2 }}
            className="fruit-list-card"
          >
            <div className="fruit-list-icon">{fruitIcons[i % fruitIcons.length]}</div>
            <div className="fruit-list-name">{fruit.name}</div>
            <div className="fruit-list-price">Price: <span>${fruit.price}</span></div>
            <div className="fruit-list-amount">Amount: <span>{fruit.amount} kg</span></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 