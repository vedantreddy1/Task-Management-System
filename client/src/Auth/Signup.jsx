import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const api = "http://localhost:5000/api/auth/register";
    const response = await api.post("/auth/register", form);
    console.log(response.data)
    navigate("/login")
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    
    <div className="card shadow-lg p-4" style={{ width: "450px", borderRadius: "15px" }}>
      
      <h2 className="text-center mb-4 fw-bold">🚀 Create Account</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        {/* Role Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold d-block">Select Role</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="User"
              onChange={handleChange}
            />
            <label className="form-check-label">User</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="Admin"
              onChange={handleChange}
            />
            <label className="form-check-label">Admin</label>
          </div>
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary w-100 fw-semibold">
          Sign Up
        </button>

      </form>

      {/* Extra */}
      <p className="text-center mt-3 text-muted">
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#0d6efd" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>

    </div>
  </div>
)}

export default Signup;
