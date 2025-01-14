import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp: React.FC = () => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <div className="sign-up-form">
          <h2>CREATE AN ACCOUNT</h2>
          <form>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
            <label>Surname</label>
            <input type="text" placeholder="Enter your surname" required />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Password</label>
            <div className="password-wrapper">
              <input type="password" placeholder="Enter your password" required />
              <span className="show-password-icon">👁️</span>
            </div>
            <div className="terms">
              <label>
                <input type="checkbox" required />
                I agree to the <Link to="/privacy-policy">Privacy policy</Link> and{' '}
                <Link to="/terms-of-use">Terms of use</Link> of this site.
              </label>
            </div>
            <button className="create-account-button" type="submit">
              CREATE AN ACCOUNT
            </button>
          </form>
          <div className="or-section">or continue with</div>
          <div className="social-buttons">
            <button className="google">Google</button>
            <button className="apple">Apple</button>
            <button className="facebook">Facebook</button>
          </div>
          <p className="sign-in-link">
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </div>
        <div className="account-benefits">
          <h3>ACCOUNT BENEFITS</h3>
          <ul>
            <li>Get a bonus for the first online purchase for new members.</li>
            <li>Get cashback to your personal account for every order.</li>
            <li>Use a more convenient way to make and track the order.</li>
            <li>First to learn about interesting promotions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
