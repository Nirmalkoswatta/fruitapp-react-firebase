import React, { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cart, updateCartItem, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // Navigate to billing page instead of direct checkout
    if (cart.length === 0) return toast.info('Your cart is empty!');
    navigate('/billing');
  };

  return (
    <div className="cart-page">
      <LogoutButton />
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <button className="cart-back-btn" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
      <div className="cart-list">
        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.id}>
              <span className="cart-emoji">{item.emoji}</span>
              <span className="cart-name">{item.name}</span>
              <span className="cart-price">${item.price.toFixed(2)}</span>
              <input
                type="number"
                min="1"
                className="cart-qty"
                value={item.quantity}
                onChange={e => updateCartItem(item.id, Number(e.target.value))}
              />
              <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div className="cart-total-row">
        <span className="cart-total-label">Total:</span>
        <span className="cart-total-value">${total.toFixed(2)}</span>
        <button className="cart-back-btn" style={{marginLeft: '2rem'}} onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
} 