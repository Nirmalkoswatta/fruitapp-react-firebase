import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../store/CartContext';
import LogoutButton from '../components/LogoutButton';
import { toast } from 'react-toastify';

export default function Billing() {
  const { cart, updateCartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [paypalEmail, setPaypalEmail] = useState('');
  
  const handleBillingInfoChange = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCreditCardChange = (field, value) => {
    setCreditCardInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const validateForm = () => {
    // Check billing address
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    for (let field of requiredFields) {
      if (!billingInfo[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Check payment method specific validation
    if (paymentMethod === 'credit-card') {
      const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
      for (let field of cardFields) {
        if (!creditCardInfo[field].trim()) {
          toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return false;
        }
      }
      
      // Basic credit card validation
      if (creditCardInfo.cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid card number');
        return false;
      }
      
      if (creditCardInfo.cvv.length < 3) {
        toast.error('Please enter a valid CVV');
        return false;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail.trim()) {
        toast.error('Please enter your PayPal email');
        return false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(paypalEmail)) {
        toast.error('Please enter a valid PayPal email');
        return false;
      }
    }
    
    return true;
  };
  
  const handleProceedToCheckout = async () => {
    if (cart.length === 0) {
      toast.info('Your cart is empty!');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Simulate payment processing
      toast.info('Processing payment...');
      
      // In a real app, you would integrate with actual payment processors here
      setTimeout(async () => {
        try {
          await updateCartItem('__CLEAR__', 0); // Clear cart
          toast.success('Payment successful! Thank you for your purchase.');
          navigate('/shop');
        } catch (e) {
          toast.error('Payment failed. Please try again.');
        }
      }, 2000);
      
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    }
  };
  
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };
  
  return (
    <div className="billing-page">
      <LogoutButton />
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      
      <div className="billing-header">
        <h1 className="billing-title">Billing & Payment</h1>
        <button className="billing-back-btn" onClick={() => navigate('/cart')}>
          ← Back to Cart
        </button>
      </div>
      
      <div className="billing-container">
        <div className="billing-form-section">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <span className="order-item-emoji">{item.emoji}</span>
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-qty">x{item.quantity}</span>
                  <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </div>
          
          {/* Billing Address */}
          <div className="billing-address">
            <h2>Billing Address</h2>
            <div className="billing-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="First Name"
                  value={billingInfo.firstName}
                  onChange={(e) => handleBillingInfoChange('firstName', e.target.value)}
                  className="form-input half-width"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={billingInfo.lastName}
                  onChange={(e) => handleBillingInfoChange('lastName', e.target.value)}
                  className="form-input half-width"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={billingInfo.email}
                onChange={(e) => handleBillingInfoChange('email', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={billingInfo.address}
                onChange={(e) => handleBillingInfoChange('address', e.target.value)}
                className="form-input"
              />
              <div className="form-row">
                <input
                  type="text"
                  placeholder="City"
                  value={billingInfo.city}
                  onChange={(e) => handleBillingInfoChange('city', e.target.value)}
                  className="form-input third-width"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={billingInfo.state}
                  onChange={(e) => handleBillingInfoChange('state', e.target.value)}
                  className="form-input third-width"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={billingInfo.zipCode}
                  onChange={(e) => handleBillingInfoChange('zipCode', e.target.value)}
                  className="form-input third-width"
                />
              </div>
              <select
                value={billingInfo.country}
                onChange={(e) => handleBillingInfoChange('country', e.target.value)}
                className="form-input"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="payment-method">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">💳 Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">🅿️ PayPal</span>
              </label>
            </div>
            
            {paymentMethod === 'credit-card' && (
              <div className="credit-card-form">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={creditCardInfo.cardholderName}
                  onChange={(e) => handleCreditCardChange('cardholderName', e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={creditCardInfo.cardNumber}
                  onChange={(e) => handleCreditCardChange('cardNumber', formatCardNumber(e.target.value))}
                  className="form-input"
                  maxLength="19"
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={creditCardInfo.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      handleCreditCardChange('expiryDate', value);
                    }}
                    className="form-input half-width"
                    maxLength="5"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={creditCardInfo.cvv}
                    onChange={(e) => handleCreditCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="form-input half-width"
                    maxLength="4"
                  />
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="paypal-form">
                <input
                  type="email"
                  placeholder="PayPal Email Address"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="form-input"
                />
                <p className="paypal-note">
                  You will be redirected to PayPal to complete your payment.
                </p>
              </div>
            )}
          </div>
          
          <button 
            className="proceed-checkout-btn"
            onClick={handleProceedToCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout - ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
