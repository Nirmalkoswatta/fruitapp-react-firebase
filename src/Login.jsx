import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; // 🔁 Make sure your firebase.js file exports `auth`
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
      toast.error('Login failed: ' + err.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      {/* Background GIF */}
      <img
        src="/background.gif"
        alt="background"
        className="login-bg"
      />

      {/* Overlay */}
      <div className="login-overlay" />

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="login-box"
      >
        <h2 className="login-title">Welcome Back</h2>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="login-input"
            placeholder="Email address"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="login-input"
            placeholder="Password"
            required
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="login-divider">
          <div className="divider-line" />
          <span className="divider-text">or</span>
          <div className="divider-line" />
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="login-google-btn"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="login-google-icon"
          />
          Sign in with Google
        </motion.button>

        <div className="login-register-link-wrapper">
          <span>Not registered? </span>
          <Link to="/register" className="login-register-link">Register here</Link>
        </div>
      </motion.div>
    </div>
  );
}
