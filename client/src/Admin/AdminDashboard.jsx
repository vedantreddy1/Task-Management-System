// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Link,Outlet, useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
// const navigate = useNavigate()
//   const [myData,setMyData] = useState([])
//   const [AssId,setAssId] = useState("")

//   const loadData = async () => {
//     const api = `http://localhost:5000/api/auth/showData`;
//     const response = await axios.get(api);

//     setMyData(response.data)

//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const AssignRole=(id) =>{

//  navigate(`/admin/adminTask/${id}`);

//   }

//   const fs = myData.map((e)=>{
//     return (
//       <>
//         <tr key={e._id}>
//           <td>{e.name}</td>
//           <td>{e.email}</td>
//           <td>{e.role}</td>
//           <td><button onClick={()=>AssignRole(e._id)}>Assign Task</button></td>
//         </tr>
//       </>
//     );
//   })

//  return (
//   <div>
//     {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/admin">
//           Admin Panel
//         </Link>

//         <div>
//           <Link className="btn btn-outline-light me-2" to="/admin">
//             Users
//           </Link>
//           <Link className="btn btn-outline-light" to="/admin/showData">
//             Task History
//           </Link>
//         </div>
//       </div>
//     </nav> */}

//     <div className="container mt-4">
//       <Outlet />

//       <div className="card shadow mt-4">
//         <div className="card-header bg-primary text-white">
//           <h5>User List</h5>
//         </div>

//         <div className="card-body">
//           <table className="table table-bordered table-hover text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>{fs}</tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

// export default AdminDashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import api from "../api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [myData, setMyData] = useState([]);

  const loadData = async () => {
    try {
      // const api = `http://localhost:5000/api/auth/showData`;
      const response = await api.get("/api/auth/showData");
      setMyData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 Stats Calculation
  const totalUsers = myData.length;
  const adminCount = myData.filter((u) => u.role === "Admin").length;
  const userCount = myData.filter((u) => u.role === "User").length;

  const chartData = [
    { name: "Admins", value: adminCount },
    { name: "Users", value: userCount },
  ];

  const COLORS = ["#ff4d4f", "#1890ff"];

  const AssignRole = (id) => {
    navigate(`/admin/adminTask/${id}`);
  };

  return (
    <div className="container mt-4">
      <Outlet />

      {/* 🔥 STATS CARDS */}
      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h6>Total Users</h6>
            <h3>{totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h6>Admins</h6>
            <h3>{adminCount}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h6>Users</h6>
            <h3>{userCount}</h3>
          </div>
        </div>
      </div>

      {/* 🔥 CHART */}
      <div className="card shadow mb-4 p-3 text-center">
        <h5>User Role Distribution</h5>

        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* 🔥 USER TABLE */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5>User List</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {myData.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => AssignRole(e._id)}
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;