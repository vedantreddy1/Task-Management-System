import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const AdminAddTask = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    assignTo: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const loadData = async () => {
    const user = JSON.parse(localStorage.getItem("User"));

    // const api = `http://localhost:5000/api/auth/showData`;
    const response = await api.get("/api/auth/showData");
    // const lastuser = response.data[response.data.length - 1];
    console.log(user.id);
    // console.log(response.data)
    setForm({ ...form, createdBy: user.id, assignTo: id });
    console.log(form);

  const token = localStorage.getItem("token");

    alert(token)

    return user.id;
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const api = `http://localhost:5000/api/task/assignTask/${id}`;
    // const response = await api.post(api, form);
    const response = await api.post(`/api/task/assignTask/${id}`, form);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Create Task</h3>
        {/* <p>Token: {localStorage.getItem("token")}</p> */}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Assigned To */}
          <div className="mb-3">
            {/* <label className="form-label">Assign To (User ID)</label> */}
            <input
              type="hidden"
              className="form-control"
              name="assignTo"
              value={form.assignTo}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {/* Created By */}
          <div className="mb-3">
            {/* <label className="form-label">Created By</label> */}
            <input
              type="hidden"
              className="form-control"
              name="createdBy"
              value={form.createdBy}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddTask;
