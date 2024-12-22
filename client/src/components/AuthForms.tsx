// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Lock, Mail, User } from 'lucide-react';

// interface AuthFormsProps {
//   onSuccess: () => void;
// }

// export const AuthForms: React.FC<AuthFormsProps> = ({ onSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const { login, register } = useAuth();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     try {
//       if (isLogin) {
//         await login(email, password);
//       } else {
//         const name = formData.get('name') as string;
//         await register(email, password, name);
//       }
//       onSuccess();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-400">
//             {isLogin ? 'Sign in to your account' : 'Create new account'}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded">
//               {error}
//             </div>
//           )}
          
//           {!isLogin && (
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <User className="h-5 w-5 text-purple-400" />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Full name"
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label htmlFor="email" className="sr-only">Email address</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <Mail className="h-5 w-5 text-purple-400" />
//               </div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Email address"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <Lock className="h-5 w-5 text-purple-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//             >
//               {isLogin ? 'Sign in' : 'Sign up'}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-purple-400 hover:text-purple-300"
//             >
//               {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };