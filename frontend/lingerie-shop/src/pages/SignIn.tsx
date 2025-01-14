import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.scss'; 

const SignIn: React.FC = () => {
  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-form">
          <h2>SIGN IN</h2>
          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Password</label>
            <div className="password-wrapper">
              <input type="password" placeholder="Enter your password" required />
              <span className="show-password-icon">👁️</span>
            </div>
            <div className="options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
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
    </div>
  );
};

export default SignIn;
