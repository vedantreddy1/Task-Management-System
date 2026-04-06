import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link,Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
const navigate = useNavigate()
  const [myData,setMyData] = useState([])
  const [AssId,setAssId] = useState("")

  const loadData = async () => {
    const api = `http://localhost:5000/api/auth/showData`;
    const response = await axios.get(api);

    setMyData(response.data)

  };

  useEffect(() => {
    loadData();
  }, []);

  const AssignRole=(id) =>{

   
 navigate(`/admin/adminTask/${id}`);


  }

  const fs = myData.map((e)=>{
    return (
      <>
        <tr key={e._id}>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.role}</td>
          <td><button onClick={()=>AssignRole(e._id)}>Assign Task</button></td>
        </tr>
      </>
    );
  })


 return (
  <div>
    {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          Admin Panel
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/admin">
            Users
          </Link>
          <Link className="btn btn-outline-light" to="/admin/showData">
            Task History
          </Link>
        </div>
      </div>
    </nav> */}

    <div className="container mt-4">
      <Outlet />

      <div className="card shadow mt-4">
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

            <tbody>{fs}</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;
