import React, { useState } from 'react';
import axios from 'axios';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isLogin && form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const url = isLogin ? "http://backend:5000/login" : "http://backend:5000/signup";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      const res = await axios.post(url, payload);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "An error occurred");
    }

    setForm({ username: '', email: '', password: '', confirmPassword: '' });
    
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Login</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin && (
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          {isLogin && (
            <p>
              Not a member?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                Signup now
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
