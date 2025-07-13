import { useEffect, useState } from 'react';
import { AuthService } from '@/services/authService';
import { LoginData, SignupData } from '@/types';
import { saveUserToStorage, loadUserFromStorage, removeFromLocalStorage, LOCAL_STORAGE_KEYS } from '@/utils/localStorage';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const user = loadUserFromStorage();
    if (user) {
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  }, [setAuth]);

  const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    setAuth(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await AuthService.login(data);
      
      if (result.success && result.user) {
        setAuth({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        });
        saveUserToStorage(result.user);
        return { success: true };
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      setAuth(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    setAuth(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await AuthService.signup(data);
      
      if (result.success && result.user) {
        setAuth({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        });
        saveUserToStorage(result.user);
        return { success: true };
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      setAuth(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
  };

  return {
    ...auth,
    login,
    signup,
    logout,
  };
};
