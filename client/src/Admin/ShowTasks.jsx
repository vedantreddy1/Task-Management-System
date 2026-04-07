import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../api';

const ShowTasks = () => {

    const [mydata,setMydata] = useState([])

    const loadData = async()=>{

        // const api = "http://localhost:5000/api/task/showData";
        const response = await api.get("/api/task/showData");

        console.log(response.data)
        setMydata(response.data)
    }


    const fs = mydata.map((e)=>{
      
          return (
            <>
              <tr key={e._id}>
                <td>{e.assignTo?.name}</td>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td>{e.status}</td>
                <td>{e.createdBy?.name}</td>
              </tr>
            </>
          );
        })


       useEffect(()=>{
        loadData();
       },[])
  

  return (
  <div className="container mt-5">
    <h3 className="text-center mb-4">📋 Task List</h3>

    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow">
        
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Task Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {fs}
        </tbody>

      </table>
    </div>
  </div>
);

}

export default ShowTasks
