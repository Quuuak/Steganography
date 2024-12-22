// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User, AuthState } from '../types';
// import { generateId } from '../utils/helpers';

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//   });

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       setAuthState({
//         user: JSON.parse(user),
//         isAuthenticated: true,
//       });
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     // Simulate API call
//     const storedUser = localStorage.getItem(`user_${email}`);
//     if (!storedUser) {
//       throw new Error('Invalid credentials');
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.password !== password) {
//       throw new Error('Invalid credentials');
//     }

//     const { password: _, ...user } = userData;
//     localStorage.setItem('user', JSON.stringify(user));
//     setAuthState({ user, isAuthenticated: true });
//   };

//   const register = async (email: string, password: string, name: string) => {
//     // Simulate API call
//     if (localStorage.getItem(`user_${email}`)) {
//       throw new Error('Email already exists');
//     }

//     const user: User & { password: string } = {
//       id: generateId(),
//       email,
//       name,
//       password,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem(`user_${email}`, JSON.stringify(user));
//     const { password: _, ...userData } = user;
//     localStorage.setItem('user', JSON.stringify(userData));
//     setAuthState({ user: userData, isAuthenticated: true });
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setAuthState({ user: null, isAuthenticated: false });
//   };

//   return (
//     <AuthContext.Provider value={{ ...authState, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };