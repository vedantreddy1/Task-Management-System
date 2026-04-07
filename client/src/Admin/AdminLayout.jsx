import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // optional (if using auth later)
  localStorage.removeItem("token");
  localStorage.removeItem("User");

  // Optional: show alert
  alert("You have been logged out!");

    navigate("/login");
  };

  return (
    <div>
      {/* 🔥 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/admin">
            Admin Panel
          </Link>

          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/admin">
              Users
            </Link>

            <Link className="btn btn-outline-light me-2" to="/admin/showData">
              Task History
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 PAGE CONTENT */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
