
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, AuthUser, UserCredentials } from '@/lib/auth';
import { supabaseAuthService } from '@/lib/supabaseAuth';
import { toast } from '@/hooks/use-toast';

// Use Supabase auth service if environment variable is set
const useSupabase = import.meta.env.VITE_USE_SUPABASE === 'true';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: UserCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (useSupabase) {
        // Use Supabase authentication
        try {
          const currentUser = await supabaseAuthService.getUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error checking Supabase auth:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use mock authentication
        // Check for session expiry first
        if (authService.isSessionExpired()) {
          authService.logout();
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Check for authenticated user
        const currentUser = authService.getUser();
        setUser(currentUser);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      let result;
      
      if (useSupabase) {
        // Use Supabase authentication
        result = await supabaseAuthService.login(credentials);
      } else {
        // Use mock authentication
        result = await authService.login(credentials);
      }
      
      if (result.success && result.user) {
        setUser(result.user);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: result.error || "An unknown error occurred",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (useSupabase) {
        // Use Supabase authentication
        await supabaseAuthService.logout();
      } else {
        // Simulate 500ms delay as requested for mock auth
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Call auth service to clear session
        authService.logout();
        
        // Console log for mock auth flow
        console.log("Admin session cleared");
      }
      
      // Clear user state
      setUser(null);
      
      // Show success toast
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of the admin dashboard",
      });
      
      // Navigate to login page
      // Using a small delay to ensure toast is visible before redirect
      setTimeout(() => {
        navigate('/admin/login');
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
