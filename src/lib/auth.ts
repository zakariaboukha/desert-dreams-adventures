
import { toast } from '@/hooks/use-toast';

export interface UserCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

// Mock admin user
const MOCK_ADMIN: AuthUser = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
};

// Mock authentication service for development
class AuthService {
  private static instance: AuthService;
  private attemptCounts: Record<string, { count: number; timestamp: number }> = {};
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Check if user is already authenticated
  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  // Get the current authenticated user
  getUser(): AuthUser | null {
    const userJson = localStorage.getItem('auth_user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as AuthUser;
    } catch (error) {
      console.error('Failed to parse auth user', error);
      return null;
    }
  }

  // Mock login function
  async login({ email, password, rememberMe = false }: UserCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    // Check for rate limiting
    if (this.isRateLimited(email)) {
      return { 
        success: false, 
        error: 'Too many login attempts. Please try again later.' 
      };
    }

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for valid credentials (mock validation)
    if (email === 'admin@example.com' && password === 'admin123') {
      this.resetAttempts(email);
      
      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(MOCK_ADMIN));
      
      // Set session expiry
      const expiryTime = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days or 1 day
      localStorage.setItem('auth_expiry', (Date.now() + expiryTime).toString());
      
      return { 
        success: true, 
        user: MOCK_ADMIN 
      };
    }

    // Increment failed attempts
    this.incrementAttempts(email);

    // Check if email exists before returning specific error
    if (email === 'admin@example.com') {
      return { 
        success: false, 
        error: 'Invalid password.' 
      };
    }

    return { 
      success: false, 
      error: 'Invalid email or password.' 
    };
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_expiry');
  }

  // Check if session is expired
  isSessionExpired(): boolean {
    const expiryTime = localStorage.getItem('auth_expiry');
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime, 10);
  }

  // Check for rate limiting
  private isRateLimited(email: string): boolean {
    const record = this.attemptCounts[email];
    
    if (!record) return false;
    
    const isLocked = record.count >= this.MAX_ATTEMPTS && 
                      Date.now() - record.timestamp < this.LOCKOUT_DURATION;
    
    if (isLocked) {
      const remainingTime = Math.ceil((record.timestamp + this.LOCKOUT_DURATION - Date.now()) / 60000);
      toast({
        title: "Account temporarily locked",
        description: `Too many failed attempts. Please try again in ${remainingTime} minutes.`,
        variant: "destructive"
      });
    }
    
    return isLocked;
  }

  // Increment attempts for rate limiting
  private incrementAttempts(email: string): void {
    if (!this.attemptCounts[email]) {
      this.attemptCounts[email] = { count: 0, timestamp: Date.now() };
    }
    
    this.attemptCounts[email].count += 1;
    this.attemptCounts[email].timestamp = Date.now();
  }

  // Reset attempts after successful login
  private resetAttempts(email: string): void {
    delete this.attemptCounts[email];
  }
}

export const authService = AuthService.getInstance();
