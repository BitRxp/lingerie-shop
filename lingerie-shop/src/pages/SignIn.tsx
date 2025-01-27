import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import './SignIn.scss';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  // State для форми
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState<string | null>(null);

  // Обробка змін у полях форми
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Відправка форми
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/v1/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token); // Збереження токена
      setError(null);
      navigate('/'); // Перенаправлення на головну сторінку
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-form">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="show-password-icon">👁️</span>
            </div>
            <div className="options">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="sign-in-button" type="submit">
              SIGN IN
            </button>
          </form>
          <div className="or-section">or continue with</div>
          <div className="social-buttons">
            <button className="google">Google</button>
            <button className="apple">Apple</button>
            <button className="facebook">Facebook</button>
          </div>
          <p className="sign-up-link">
            Don’t have an account? <Link to="/sign-up">Create an account</Link>
          </p>
        </div>
        <div className="sign-in-banner">
          <img src="/images/sign-in-banner.jpg" alt="Sign In Banner" />
          <p>
            WE WILL EMPHASIZE THE UNIQUENESS OF WOMEN WITH THE HELP OF COMFORTABLE UNDERWEAR.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
