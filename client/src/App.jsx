// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./Auth/Signup";
// import Login from "./Auth/Login";
// import Home from "./pages/Home";
// import AdminDashboard from "./Admin/adminDashboard";
// import UserDashboard from "./User/UserDashboard";
// import AdminAddTask from "./Admin/AdminAddTask";
// import ShowTasks from "./Admin/showTasks";
// import AdminLayout from "./Admin/AdminLayout";
// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/home" element={<Home />} />

//           <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<AdminDashboard/>} />
//             <Route path="adminTask/:id" element={<AdminAddTask />} />
//             <Route path="showData" element={<ShowTasks />} />
//           </Route>

//           <Route path="/userDashboard" element={<UserDashboard />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Home from "./pages/Home";
import AdminDashboard from "./Admin/adminDashboard";
import UserDashboard from "./User/UserDashboard";
import AdminAddTask from "./Admin/AdminAddTask";
import ShowTasks from "./Admin/showTasks";
import AdminLayout from "./Admin/AdminLayout";
import ProtectedRoute from "./pages/ProtectedRoute"; // 🔥 import

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="adminTask/:id" element={<AdminAddTask />} />
          <Route path="showData" element={<ShowTasks />} />
        </Route>

        <Route
          path="/userDashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;