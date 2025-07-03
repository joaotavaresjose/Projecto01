const AuthManager = {
  login: async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@hasirparaislamic.org' && password === 'admin123') {
        const user = {
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin'
        };
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', 'sample_token_123');
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('auth_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('auth_token');
    const user = AuthManager.getCurrentUser();
    return !!(token && user);
  },

  hasRole: (requiredRole) => {
    const user = AuthManager.getCurrentUser();
    return user && user.role === requiredRole;
  }
};
