import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('medai_token') || sessionStorage.getItem('medai_token'));

  useEffect(() => {
    const raw = localStorage.getItem('medai_user') || sessionStorage.getItem('medai_user');
    if (raw && token) {
      setUser(JSON.parse(raw));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email: string, password: string, remember: boolean) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
    const { token: jwt, user: userData } = response.data;
    setToken(jwt);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('medai_token', jwt);
    storage.setItem('medai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('medai_token');
    localStorage.removeItem('medai_user');
    sessionStorage.removeItem('medai_token');
    sessionStorage.removeItem('medai_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
