import { useState } from "react";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
        setMessage(data.error);
        return;
      }
       
      setMessage(data.message);
      console.log("Login successful:", data);

      
      console.log("Token:", data.token);
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error)
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
  <div className="input-group">
    <label htmlFor="login-eml-input">Email</label>
    <input
      id="login-eml-input"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="input-group">
    <label htmlFor="login-psw-input">Password</label>
    <input
      id="login-psw-input"
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button id="login-button" type="submit">
    Login
  </button>
  <h3>don't have an account? <a href="/register">Create Account</a></h3>
 
</form>
 <h2>{message}</h2>
    </div>
  );
};

export default Login;