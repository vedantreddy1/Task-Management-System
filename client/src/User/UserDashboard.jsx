import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [mydata, setMydata] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/task/showDatabyId/${user.id}`,
      );
      setMydata(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openStatusForm = (taskId) => {
    setSelectedTaskId(taskId);
    setShowForm(true); // show the form
  };

  const updateStatus = async () => {
    if (!status) return alert("Please select a status");

    try {
      await axios.put(
        `http://localhost:5000/api/task/updateTask/${selectedTaskId}`,
        {
          status,
        },
      );

      setShowForm(false);
      setStatus("");
      setSelectedTaskId("");
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    // optional (if using auth later)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: show alert
    alert("You have been logged out!");

    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <h3 className="text-center mb-4">📋 Task List</h3>

      <table className="table table-bordered table-hover shadow text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mydata.map((task) => (
            <tr key={task._id}>
              <td>{task.assignTo?.name}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.createdBy?.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openStatusForm(task._id)}
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      {showForm && (
        <div className="card p-3 shadow mt-3">
          <h5>Update Status</h5>

          <select
            className="form-control mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div>
            <button className="btn btn-success me-2" onClick={updateStatus}>
              Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
