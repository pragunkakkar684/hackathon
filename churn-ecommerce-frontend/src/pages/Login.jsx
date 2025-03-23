import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import styles from "./Login.module.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(form.email, form.password);
      console.log("✅ Login Successful:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className={styles.switchText}>
          Don't have an account? <a href="/signup" className={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
