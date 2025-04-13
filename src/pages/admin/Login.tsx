
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/admin/LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Don't render the login form if already authenticated or still loading
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Desert Dreams Admin
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the admin area
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
