import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");


try {
  const res = await fetch(`http://65.2.37.171:8000/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || "Login successful!");
        // On real projects: save JWT to localStorage here
      } else {
        setMsg(data.error || "Login failed.");
      }
    } catch {
      setMsg("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: 300, margin: "20px auto" }}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p style={{ color: msg.toLowerCase().includes("success") ? "green" : "red" }}>{msg}</p>
    </form>
  );
}

export default Login;
