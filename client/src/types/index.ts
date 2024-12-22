export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface StegOperation {
  id: string;
  userId: string;
  type: 'encode' | 'decode';
  timestamp: string;
  imageUrl?: string;
}