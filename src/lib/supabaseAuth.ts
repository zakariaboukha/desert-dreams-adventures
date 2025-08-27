import { supabase } from './supabase';
import { AuthUser, UserCredentials } from './auth';

// Supabase authentication service
export class SupabaseAuthService {
  private static instance: SupabaseAuthService;

  private constructor() {}

  public static getInstance(): SupabaseAuthService {
    if (!SupabaseAuthService.instance) {
      SupabaseAuthService.instance = new SupabaseAuthService();
    }
    return SupabaseAuthService.instance;
  }

  // Check if user is already authenticated
  async isAuthenticated(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }

  // Get the current authenticated user
  async getUser(): Promise<AuthUser | null> {
    const { data } = await supabase.auth.getUser();
    
    if (!data.user) return null;
    
    // Map Supabase user to AuthUser format
    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || 'User',
      role: data.user.user_metadata?.role || 'user',
    };
  }

  // Login with Supabase
  async login({ email, password }: UserCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { 
          success: false, 
          error: error.message 
        };
      }

      if (!data.user) {
        return { 
          success: false, 
          error: 'Authentication failed' 
        };
      }

      // Map Supabase user to AuthUser format
      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || 'User',
        role: data.user.user_metadata?.role || 'user',
      };

      return { 
        success: true, 
        user 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  }

  // Logout from Supabase
  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }
}

export const supabaseAuthService = SupabaseAuthService.getInstance();