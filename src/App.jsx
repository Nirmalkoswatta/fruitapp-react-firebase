import { Routes, Route, Navigate } from 'react-router-dom';
import AddFruit from './AddFruit';
import Login from './Login';
import Register from './Register';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={user ? <AddFruit /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
