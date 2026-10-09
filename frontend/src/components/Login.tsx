
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login successful:", data);

      setMessage("Login successful!");

      
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          

          <h1 style={{display:"flex",justifyContent:"center"}}>Login</h1>

          <p style={{display:"flex",justifyContent:"center"}}>
            Sign in to your management dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">

          <div className="auth-input-group">
            <label htmlFor="login-eml-input">
              Email Address
            </label>

            <input
              id="login-eml-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <div className="password-label">
              <label htmlFor="login-psw-input">
                Password
              </label>
            </div>

            <div className="password-wrapper">
              <input
                id="login-psw-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            id="login-button"
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {message && (
            <div
              className={`auth-message ${
                message === "Login successful!"
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
            Don't have an account?
          </p>

          <Link to="/register">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;

