import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', mobile: '' });
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
    if (!form.email || !form.password || !form.mobile) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(collection(db, 'users'), userCred.user.uid), {
        email: form.email,
        mobile: form.mobile
      });
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(collection(db, 'users'), result.user.uid), {
        email: result.user.email,
        mobile: ''
      }, { merge: true });
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="animated-bg">
        <div className="animated-bg-shape animated-bg-shape1" />
        <div className="animated-bg-shape animated-bg-shape2" />
        <div className="animated-bg-shape animated-bg-shape3" />
      </div>
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        {error && <div className="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="register-input"
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="register-input"
            placeholder="Password"
            required
          />
          <input
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            className="register-input"
            placeholder="Mobile Number"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="register-divider">or</div>
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="register-google-btn"
        >
          Sign up with Google
        </button>
      </div>
    </div>
  );
} 