
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './login.css';

function Login({ isLoggedIn, onAuthSuccess }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/search');
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const identifier = formData.username.trim();
      const data = await loginUser({
        username: identifier,
        user: identifier,
        email: identifier.includes('@') ? identifier : '',
        password: formData.password,
      });
      const authToken = data.token || data.access || data.access_token;
      if (authToken) {
        const backendUser = data.user || {
          user: data.user || data.username || identifier,
          username: data.username || identifier,
          email: data.email || '',
        };
        onAuthSuccess(authToken, backendUser);
      } else {
        throw { detail: 'Login succeeded but no token was returned.' };
      }
      navigate('/search');
    } catch (err) {
      setError(err.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrap">

        {/* Hero panel */}
        <div className="login-hero">
          <div className="hero-bg" />
          <div className="hero-circles">
            <span className="c c1" /><span className="c c2" /><span className="c c3" />
          </div>
          <span className="dish-icon" aria-hidden="true">🍽</span>
          <p className="hero-tag">AI-Powered Discovery</p>
          <h1 className="hero-title">Find your next<br /><em>perfect meal</em></h1>
          <p className="hero-sub">Personalized recommendations from the best restaurants near you.</p>
        </div>

        {/* Form panel */}
        <div className="login-form-side">
          <div className="login-brand">
            <div className="brand-dot" aria-hidden="true">🍽</div>
            <span className="brand-name">AI FoodSearch</span>
          </div>

          <h2 className="form-heading">Welcome back</h2>
          <p className="form-sub">Sign in to your account</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text" id="username" placeholder="Enter your username"
                value={formData.username} onChange={handleChange} required
              />
            </div>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" placeholder="••••••••"
                value={formData.password} onChange={handleChange} required
              />
            </div>
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="login-divider">
            <span className="divider-line" /><span className="divider-text">new here?</span><span className="divider-line" />
          </div>
          <p className="signup-text">Don't have an account? <Link to="/signup">Sign up</Link></p>

          <footer className="login-footer">
            <p>© {new Date().getFullYear()} Mileiny Nolasco · support@foodsearch.com</p>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default Login;