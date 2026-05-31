import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./signup.css";
 
function Signup({ isLoggedIn, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    gender: "",
    phoneNumber: "",
    birthday: "",
    homeAddress: "",
    email: "",
    preferredLanguage: "en",
    password: "",
    confirmPassword: "",
  });
 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    if (isLoggedIn) navigate("/search");
  }, [isLoggedIn, navigate]);
 
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
 
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
 
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      name: formData.name,
      gender: formData.gender,
      phone_number: formData.phoneNumber,
      birthday: formData.birthday,
      home_address: formData.homeAddress,
      preferred_language: formData.preferredLanguage,
    };
 
    try {
      const result = await registerUser(userData);
      const authToken = result.token || result.access || result.access_token;
 
      if (authToken) {
        const backendUser = result.user || {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          phone_number: formData.phoneNumber,
          birthday: formData.birthday,
          home_address: formData.homeAddress,
          preferred_language: formData.preferredLanguage,
        };
        localStorage.setItem(
          "preferredLanguage",
          backendUser.preferred_language || formData.preferredLanguage
        );
        onAuthSuccess(authToken, backendUser);
        navigate("/search");
        return;
      }
 
      setMessage("User registered successfully! Please login.");
      navigate("/login");
    } catch (error) {
      const firstError =
        error.username?.[0] ||
        error.email?.[0] ||
        error.password?.[0] ||
        error.confirm_password?.[0] ||
        error.name?.[0] ||
        error.gender?.[0] ||
        error.phone_number?.[0] ||
        error.birthday?.[0] ||
        error.home_address?.[0] ||
        error.preferred_language?.[0] ||
        error.detail ||
        "Registration failed";
      setMessage(firstError);
    }
  }
 
  return (
    <div className="su-page">
      <div className="su-card">
 
        {/* Header */}
        <div className="su-header">
          <div className="su-hblob su-hb1" aria-hidden="true" />
          <div className="su-hblob su-hb2" aria-hidden="true" />
          <p className="su-eyebrow">Join FoodSearch</p>
          <h1 className="su-htitle">Create your <em>account</em></h1>
          <p className="su-hsub">All fields are required to get started</p>
        </div>
 
        {/* Form body */}
        <div className="su-body">
          {message && <div className="su-error">{message}</div>}
 
          <form onSubmit={handleSubmit}>
 
            <p className="su-section-label">Account info</p>
 
            <div className="su-grid-2">
              <div className="su-field">
                <label className="su-label" htmlFor="username">Username</label>
                <input
                  className="su-input" type="text" id="username"
                  placeholder="e.g. jsmith"
                  value={formData.username} onChange={handleChange} required
                />
              </div>
              <div className="su-field">
                <label className="su-label" htmlFor="name">Full name</label>
                <input
                  className="su-input" type="text" id="name"
                  placeholder="Jane Smith"
                  value={formData.name} onChange={handleChange} required
                />
              </div>
            </div>
 
            <div className="su-grid-2">
              <div className="su-field">
                <label className="su-label" htmlFor="email">Email</label>
                <input
                  className="su-input" type="email" id="email"
                  placeholder="you@example.com"
                  value={formData.email} onChange={handleChange} required
                />
              </div>
              <div className="su-field">
                <label className="su-label" htmlFor="phoneNumber">Phone number</label>
                <input
                  className="su-input" type="tel" id="phoneNumber"
                  placeholder="+1 555 000 0000"
                  value={formData.phoneNumber} onChange={handleChange} required
                />
              </div>
            </div>
 
            <p className="su-section-label su-section-label--spaced">Personal details</p>
 
            <div className="su-grid-2">
              <div className="su-field">
                <label className="su-label" htmlFor="gender">Gender</label>
                <select
                  className="su-select" id="gender"
                  value={formData.gender} onChange={handleChange} required
                >
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
              <div className="su-field">
                <label className="su-label" htmlFor="birthday">Birthday</label>
                <input
                  className="su-input" type="date" id="birthday"
                  value={formData.birthday} onChange={handleChange} required
                />
              </div>
            </div>
 
            <div className="su-field">
              <label className="su-label" htmlFor="homeAddress">Home address</label>
              <input
                className="su-input" type="text" id="homeAddress"
                placeholder="123 Main St, City, State"
                value={formData.homeAddress} onChange={handleChange} required
              />
            </div>
 
            <div className="su-field">
              <label className="su-label" htmlFor="preferredLanguage">Preferred language</label>
              <select
                className="su-select" id="preferredLanguage"
                value={formData.preferredLanguage} onChange={handleChange} required
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
 
            <div className="su-divider" />
 
            <p className="su-section-label">Set a password</p>
 
            <div className="su-grid-2">
              <div className="su-field">
                <label className="su-label" htmlFor="password">Password</label>
                <input
                  className="su-input" type="password" id="password"
                  placeholder="••••••••"
                  value={formData.password} onChange={handleChange} required
                />
              </div>
              <div className="su-field">
                <label className="su-label" htmlFor="confirmPassword">Confirm password</label>
                <input
                  className="su-input" type="password" id="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword} onChange={handleChange} required
                />
              </div>
            </div>
 
            <button type="submit" className="su-btn">
              Create account <span className="su-arrow">→</span>
            </button>
          </form>
 
          <p className="su-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
 
      </div>
    </div>
  );
}
 
export default Signup;

