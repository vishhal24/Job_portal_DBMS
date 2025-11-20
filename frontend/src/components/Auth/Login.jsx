import React from "react";
import "../styles/global.css";
import "../styles/form.css";

const Login = () => {
  return (
    <div className="form-container">
      <h2>Welcome Back 👋</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="text-center">
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
