import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    toast.info('Logged out successfully.');
    navigate('/login');
  };
  return (
    <div className="dashboard-logout-fixed">
      <button onClick={handleLogout} className="dashboard-logout">Logout</button>
    </div>
  );
} 