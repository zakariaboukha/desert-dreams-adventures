
import * as React from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Explicitly use React.useState to avoid any potential scope issues
  const [theme, setTheme] = React.useState<Theme>(() => {
    // We need to check if window is defined to avoid SSR issues
    if (typeof window !== 'undefined') {
      // Try to get the theme from localStorage
      const savedTheme = localStorage.getItem('theme') as Theme;
      // Default to light if nothing saved or invalid value
      return savedTheme === 'dark' ? 'dark' : 'light'; 
    }
    return 'light'; // Default theme
  });

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // Use useEffect to handle side effects properly
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save theme preference to localStorage whenever it changes
      localStorage.setItem('theme', theme);

      // Apply theme to document
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  const contextValue = React.useMemo(() => {
    return { theme, setTheme, toggleTheme };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
