import { User, LoginData, SignupData } from '@/types';
import { LOCAL_STORAGE_KEYS, getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  private static getUsers(): User[] {
    return getFromLocalStorage<User[]>(LOCAL_STORAGE_KEYS.USERS) || [];
  }

  private static saveUsers(users: User[]): void {
    setToLocalStorage(LOCAL_STORAGE_KEYS.USERS, users);
  }

  static async login(data: LoginData): Promise<{ success: boolean; user?: User; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = this.getUsers();
        const user = users.find(u => u.email === data.email);

        if (!user) {
          resolve({ success: false, error: 'User not found' });
          return;
        }

        // In a real app, you would verify the password hash
        // For demo purposes, we'll just check if password is not empty
        if (!data.password) {
          resolve({ success: false, error: 'Invalid password' });
          return;
        }

        resolve({ success: true, user });
      }, 1000); // Simulate API delay
    });
  }

  static async signup(data: SignupData): Promise<{ success: boolean; user?: User; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = this.getUsers();
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === data.email);
        if (existingUser) {
          resolve({ success: false, error: 'User already exists' });
          return;
        }

        // Create new user
        const newUser: User = {
          id: uuidv4(),
          email: data.email,
          name: data.name,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        this.saveUsers(users);

        resolve({ success: true, user: newUser });
      }, 1000); // Simulate API delay
    });
  }

  static logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  }

  static getCurrentUser(): User | null {
    return getFromLocalStorage<User>(LOCAL_STORAGE_KEYS.USER);
  }
}
