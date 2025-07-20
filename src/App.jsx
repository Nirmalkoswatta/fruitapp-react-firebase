import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import FruitShop from './pages/FruitShop';
import Cart from './pages/Cart';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/shop" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/shop" />} />
      <Route path="/shop" element={<FruitShop user={user} />} />
      <Route path="/cart" element={<Cart user={user} />} />
      <Route path="/" element={<Navigate to="/shop" />} />
      <Route path="*" element={<Navigate to={user ? "/shop" : "/login"} />} />
    </Routes>
  );
}

export default App;
