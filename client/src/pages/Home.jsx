import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [myData, setMyData] = useState([]);
 

  useEffect(()=>{
 const loadData = async () => {
   localStorage.getItem("token");


     const user = JSON.parse(localStorage.getItem("user"));

     if (!user) {
       navigate("/login");
       return;
     }

   const api = "http://localhost:5000/api/auth/showData";
   const response = await axios.get(api);
const lastuser =response.data[ response.data.length - 1];
   console.log(lastuser);

  //  const api2 = `http://localhost:5000/api/auth/showData/${response.data._id}`;
  //  const response2 = await axios.get(api2);

  //  console.log(object)
  
//  console.log(response2.data)
  

   if (user.role == "Admin") {
     navigate("/admin");
   } else {
     navigate("/userDashboard");
   }

 };

 loadData();
  },[])

  return (
    <div >
     
    </div>
  );
};

export default Home;
