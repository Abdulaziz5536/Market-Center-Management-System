
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      console.log("Account Created:", data);

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">

        <div className="auth-header">
          

          <h1 style={{display:"flex",justifyContent:"center"}}>Create Account</h1>

          <p>
            Create your management system account
          </p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">

          <div className="auth-input-group">
            <label htmlFor="register-name-input">
              Full Name
            </label>

            <input
              id="register-name-input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="register-eml-input">
              Email Address
            </label>

            <input
              id="register-eml-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="register-psw-input">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="register-psw-input"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <span className="input-hint">
              Password must contain at least 6 characters.
            </span>
          </div>

          <button
            id="register-button"
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {message && (
            <div
              className={`auth-message ${
                message === "Account created successfully!"
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}

        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;

