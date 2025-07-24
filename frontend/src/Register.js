import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
      const res = await fetch("http://65.2.37.171:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || "Registration successful!");
        setForm({ username: "", email: "", password: "" });
      } else {
        setMsg(data.error || "Registration failed.");
      }
    } catch {
      setMsg("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: 300, margin: "20px auto" }}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required /><br />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <p style={{ color: msg.toLowerCase().includes("success") ? "green" : "red" }}>{msg}</p>
    </form>
  );
}

export default Register;
