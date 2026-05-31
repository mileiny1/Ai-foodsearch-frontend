import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, saveAuthSession, updateUserProfile, fetchUserProfile } from "../services/authService";

import "./Profile.css";
 
const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "pt", label: "Portuguese" },
];
 
const FIELD_CONFIGS = [
  { key: "username",           label: "Username",           type: "text",   icon: "user" },
  { key: "email",              label: "Email",              type: "email",  icon: "mail" },
  { key: "gender",             label: "Gender",             type: "text",   icon: "gender-androgyne" },
  { key: "phone_number",       label: "Phone number",       type: "tel",    icon: "phone" },
  { key: "birthday",           label: "Birthday",           type: "date",   icon: "cake" },
  { key: "home_address",       label: "Home address",       type: "text",   icon: "map-pin" },
  { key: "preferred_language", label: "Preferred language", type: "select", icon: "language" },
];
 
function getInitialProfile() {
  const storedUser = getStoredUser() || {};
  return {
    name:               storedUser.name               || "",
    username:           storedUser.username           || "",
    email:              storedUser.email              || "",
    gender:             storedUser.gender             || "",
    phone_number:       storedUser.phone_number       || "",
    birthday:           storedUser.birthday           || "",
    home_address:       storedUser.home_address       || "",
    preferred_language: storedUser.preferred_language || "en",
  };
}
 
function getFieldError(errorData, fieldName) {
  if (!errorData || typeof errorData !== "object") return "Could not update profile.";
  return (
    errorData.detail ||
    errorData[fieldName]?.[0] ||
    Object.values(errorData).find((v) => Array.isArray(v) && v[0])?.[0] ||
    "Could not update profile."
  );
}
 
function initials(name) {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
 
export default function Profile({ isLoggedIn, onUserChange }) {
  const navigate = useNavigate();
  const [profile, setProfile]           = useState(getInitialProfile);
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue]     = useState("");
  const [savingField, setSavingField]   = useState("");
  const [message, setMessage]           = useState("");
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(true);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isLoggedIn || !token) { navigate("/login"); return; }
 
    const loadProfile = async () => {
      try {
        setLoading(true);
        const backendUser = await fetchUserProfile(token);
        const next = {
          name:               backendUser.name               || "",
          username:           backendUser.username           || "",
          email:              backendUser.email              || "",
          gender:             backendUser.gender             || "",
          phone_number:       backendUser.phone_number       || "",
          birthday:           backendUser.birthday           || "",
          home_address:       backendUser.home_address       || "",
          preferred_language: backendUser.preferred_language || "en",
        };
        setProfile(next);
        saveAuthSession(token, backendUser);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load profile";
        setError(msg);
        if (msg.includes("expired") || msg.includes("log in")) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
 
    loadProfile();
  }, [isLoggedIn, navigate]);
 
  const startEditing = (field) => {
    setEditingField(field);
    setDraftValue(profile[field] || "");
    setMessage("");
    setError("");
  };
 
  const cancelEditing = () => {
    setEditingField(null);
    setDraftValue("");
    setError("");
  };
 
  const handleSave = async (field) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
 
    setSavingField(field);
    setError("");
    setMessage("");
 
    const nextValue = draftValue.trim();
    const updates = { [field]: field === "preferred_language" ? draftValue : nextValue };
 
    try {
      const updatedUser = await updateUserProfile(updates, token);
      const merged = {
        ...profile,
        ...updatedUser,
        [field]: updatedUser?.[field] ?? updates[field],
      };
      setProfile(merged);
      saveAuthSession(token, merged);
      if (typeof onUserChange === "function") onUserChange(merged);
      setEditingField(null);
      setDraftValue("");
      setMessage(`${FIELD_CONFIGS.find((f) => f.key === field)?.label || "Field"} updated successfully.`);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : null;
      if (errMsg?.includes("expired")) navigate("/login");
      const errData = err && typeof err === "object" && !(err instanceof Error) ? err : null;
      setError(errMsg || getFieldError(errData, field));
    } finally {
      setSavingField("");
    }
  };
 
  /* ── Loading state ──────────────────────────────── */
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-shell">
          <div className="profile-loading">
            <div className="loading-spinner" aria-label="Loading" />
            <p>Loading your profile…</p>
          </div>
        </div>
      </div>
    );
  }
 
  /* ── Main render ────────────────────────────────── */
  return (
    <div className="profile-page">
 
      {/* Topbar */}
      <div className="profile-topbar">
        <div className="profile-brand">
          <div className="profile-brand-icon" aria-hidden="true">🍽</div>
          <span className="profile-brand-name">AI FoodSearch</span>
        </div>
        <button className="back-btn" onClick={() => navigate("/search")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to search
        </button>
      </div>
 
      <div className="profile-shell">
 
        {/* Avatar card */}
        <div className="avatar-card">
          <div className="avatar-circle" aria-label={`Avatar for ${profile.name || profile.username}`}>
            {initials(profile.name || profile.username)}
          </div>
          <div className="avatar-info">
            <p className="avatar-name">{profile.name || profile.username || "Your name"}</p>
            <p className="avatar-email">{profile.email || "No email set"}</p>
          </div>
          <div className="avatar-badge">Member</div>
        </div>
 
        {/* Toasts */}
        {message && (
          <div className="toast toast-success" role="status">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            {message}
          </div>
        )}
        {error && (
          <div className="toast toast-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}
 
        {/* Section heading */}
        <div className="section-head">
          <p className="section-label">Account details</p>
          <p className="section-sub">Your name is read-only. All other fields can be edited.</p>
        </div>
 
        {/* Name — read only */}
        <div className="field-row field-row--readonly">
          <div className="field-left">
            <span className="field-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <label className="field-label">Name</label>
          </div>
          <div className="field-value">{profile.name || <span className="field-empty">Not set</span>}</div>
          <div className="field-action">
            <span className="readonly-badge">Read only</span>
          </div>
        </div>
 
        {/* Editable fields */}
        {FIELD_CONFIGS.map((field) => {
          const isEditing = editingField === field.key;
          const isSaving  = savingField  === field.key;
          const value     = profile[field.key] || "";
 
          const displayValue = field.key === "preferred_language"
            ? LANGUAGE_OPTIONS.find((o) => o.value === value)?.label || value
            : value;
 
          return (
            <div
              key={field.key}
              className={`field-row${isEditing ? " field-row--editing" : ""}`}
            >
              <div className="field-left">
                <span className="field-icon" aria-hidden="true">
                  <FieldIcon name={field.icon} />
                </span>
                <label className="field-label" htmlFor={field.key}>
                  {field.label}
                </label>
              </div>
 
              <div className="field-value">
                {isEditing ? (
                  field.type === "select" ? (
                    <select
                      id={field.key}
                      className="field-input"
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                      disabled={isSaving}
                      autoFocus
                    >
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      className="field-input"
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                      disabled={isSaving}
                      autoFocus
                    />
                  )
                ) : (
                  displayValue || <span className="field-empty">Not set</span>
                )}
              </div>
 
              <div className="field-action">
                {!isEditing ? (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => startEditing(field.key)}
                    aria-label={`Edit ${field.label}`}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button
                      type="button"
                      className="btn-save"
                      onClick={() => handleSave(field.key)}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving…" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={cancelEditing}
                      disabled={isSaving}
                      aria-label="Cancel edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
 
        {/* Footer */}
        <footer className="profile-footer">
          <p>© {new Date().getFullYear()} Mileiny Nolasco</p>
          <div className="footer-links">
            <a href="mailto:support@foodsearch.com">support@foodsearch.com</a>
            <a href="tel:3471234567">(347) 123-4567</a>
          </div>
        </footer>
 
      </div>
    </div>
  );
}
 
/* ── Inline icon helper ─────────────────────────────── */
function FieldIcon({ name }) {
  const icons = {
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    "gender-androgyne": <><circle cx="12" cy="8" r="4"/><line x1="12" y1="12" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.06z"/>,
    cake: <><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><line x1="2" y1="21" x2="22" y2="21"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></>,
    "map-pin": <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    language: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || <circle cx="12" cy="12" r="10"/>}
    </svg>
  );
}