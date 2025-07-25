import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../store/CartContext';
import LogoutButton from '../components/LogoutButton';
import { toast } from 'react-toastify';

const mockFruits = [
  { id: 1, name: 'Apple', price: 2.5, emoji: '🍎', photo: '/apple.jpeg' },
  { id: 2, name: 'Banana', price: 1.2, emoji: '🍌', photo: '/banana.jpeg' },
  { id: 3, name: 'Pineapple', price: 3.0, emoji: '🍍', photo: '/pinaple.jpeg' },
  { id: 4, name: 'Grape', price: 2.8, emoji: '🍇', photo: '/grape.jpeg' },
  { id: 5, name: 'Watermelon', price: 4.0, emoji: '🍉', photo: '/watermelon.jpeg' },
  { id: 6, name: 'Orange', price: 2.0, emoji: '🍊', photo: '/orange.jpeg' },
  { id: 7, name: 'Strawberry', price: 3.5, emoji: '🍓', photo: '/strawberry.jpeg' },
  { id: 8, name: 'Peach', price: 2.7, emoji: '🍑', photo: '/peaches.jpg' },
  { id: 9, name: 'Cherry', price: 3.2, emoji: '🍒', photo: '/cherry.jpeg' },
  { id: 10, name: 'Kiwi', price: 2.9, emoji: '🥝' },
  { id: 11, name: 'Mango', price: 3.8, emoji: '🥭' },
  { id: 12, name: 'Lemon', price: 1.5, emoji: '🍋', photo: '/lemon.jpeg' },
  { id: 13, name: 'Blueberry', price: 4.2, emoji: '🫐', photo: '/blueberry.jpeg' },
  { id: 14, name: 'Avocado', price: 3.0, emoji: '🥑' },
  { id: 15, name: 'Coconut', price: 4.5, emoji: '🥥' },
  { id: 16, name: 'Pear', price: 2.3, emoji: '🍐', photo: '/pear.jpeg' },
  { id: 17, name: 'Plum', price: 2.6, emoji: '🍑', photo: '/plum.jpg' },
  { id: 18, name: 'Pomegranate', price: 4.1, emoji: '🍈', photo: '/Pomegranate.jpg' },
];

export default function FruitShop() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (fruit) => {
    addToCart(fruit);
    toast.success(`${fruit.name} added to cart!`);
  };

  return (
    <div className="fruitshop-page">
      <LogoutButton />
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      <div className="fruitshop-header">
        <h1 className="fruitshop-title">Fruit Shop</h1>
        <button className="fruitshop-cart-btn" onClick={() => navigate('/cart')}>View Cart</button>
      </div>
      <div className="fruitshop-grid">
        {mockFruits.map(fruit => (
          <div className="fruitshop-card" key={fruit.id}>
            {fruit.photo ? (
              <img src={fruit.photo} alt={fruit.name} className="fruitshop-photo" />
            ) : (
              <div className="fruitshop-emoji">{fruit.emoji}</div>
            )}
            <div className="fruitshop-name">{fruit.name}</div>
            <div className="fruitshop-price">${fruit.price.toFixed(2)}</div>
            <button className="fruitshop-add-btn" onClick={() => handleAddToCart(fruit)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
} 