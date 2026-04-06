import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


  

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const api = "http://localhost:5000/api/auth/login";
        const response = await axios.post(api, form);

        console.log("LOGIN RESPONSE 👉", response.data); // 👈 ADD THIS

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.User));

        navigate("/home");
      } catch (err) {
        console.log("LOGIN ERROR 👉", err.response?.data); // 👈 ADD THIS
      }
  };

 return (
   <div className="container d-flex justify-content-center align-items-center vh-100">
     <div
       className="card shadow-lg p-4"
       style={{ width: "420px", borderRadius: "15px" }}
     >
       <h2 className="text-center mb-4 fw-bold">🔐 Welcome Back</h2>

       <form onSubmit={handleSubmit}>
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
             placeholder="Enter your password"
             onChange={handleChange}
           />
         </div>

         {/* Button */}
         <button type="submit" className="btn btn-primary w-100 fw-semibold">
           Sign In
         </button>
       </form>

       {/* Extra */}
       <p className="text-center mt-3 text-muted">
         Don't have an account?{" "}
         <span
           style={{ cursor: "pointer", color: "#0d6efd" }}
           onClick={() => navigate("/")}
         >
           Sign Up
         </span>
       </p>
     </div>
   </div>
 );
};

export default Login;
