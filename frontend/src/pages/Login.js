import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.jpg';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userName) {
      alert('Please enter your username');
      setLoading(false);
      return;
    }

    if (!password) {
      alert('Please enter your password');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { userName, password });
      if (data && data.token) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        setError('Invalid user data');
        alert('Invalid login details');
      }
    } catch (error) {
      setError('Invalid username or password');
      alert('Invalid login details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
