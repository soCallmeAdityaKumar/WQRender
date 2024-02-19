import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

// Define initial state and reducer function
const BASE_URL='http://localhost:5000/auth/'
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, token: action.payload.token, loading: false, error: null };
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create AuthContext
const AuthContext = createContext();

// Create SignupService class
class SignupService {
  static async signup(name, email, password) {
    try {
      const response = await axios.post(BASE_URL+'user/register', {
        name,
        email,
        password,
      });

      const { user } = response.data;
      return { user };
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  }
}

// Create LoginService class
class LoginService {
  static async login(email, password) {
    try {
      const response = await axios.post(BASE_URL+'user/login', {
        email,
        password,
      });

      const token= response.data;
      return {token};
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  }
}

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (name, email, password) => {
    dispatch({ type: 'SIGNUP_REQUEST' });

    try {
      const { user } = await SignupService.signup(name, email, password);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const token  = await LoginService.login(email, password);
      dispatch({ type: 'AUTH_SUCCESS', payload:  token  });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const logout = () => {
    // Implement logout logic if needed
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};