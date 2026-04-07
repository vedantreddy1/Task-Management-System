import axios from "axios";

const api =  axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses the Render backend URL
  // Optional: add headers, auth, timeout, etc.
});

export default api;
