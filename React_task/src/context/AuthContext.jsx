import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    // Valid credentials: EMP01202601 / 2026@01
    const VALID_EMPLOYEE_ID = 'EMP01202601';
    const VALID_PASSWORD = '2026@01';

    if (
      credentials.employeeId === VALID_EMPLOYEE_ID &&
      credentials.password === VALID_PASSWORD
    ) {
      const userData = {
        employeeId: credentials.employeeId,
        loginTime: new Date().toISOString(),
      };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
