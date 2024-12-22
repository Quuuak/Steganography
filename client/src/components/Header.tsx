import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import axios from 'axios';

export const Header: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  // Fetch user information from the database
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/user/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <header className="bg-gray-800 shadow-lg mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-400">Steganography Lab</h1>
          <p className="text-gray-400 text-sm">Hide encrypted messages within images securely</p>
        </div>

        <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user.name}</span>
            <span className="text-gray-400 text-sm">({user.email}, {user.phone})</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
