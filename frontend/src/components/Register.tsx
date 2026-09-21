import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
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

      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
        <div className="register">
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <div className="register-input-group">
          <label htmlFor="register-name-input">Name</label>
          <input
            id="register-name-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="register-input-group">
          <label htmlFor="register-eml-input">Email</label>
          <input
            id="register-eml-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="register-input-group">
          <label htmlFor="register-psw-input">Password</label>
          <input
            id="register-psw-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="register-button" type="submit">
          Register
        </button>
        <h3>already have an account? <a href="/login">sign in</a></h3>
      </form>
    </div>
  );
};

export default Register;