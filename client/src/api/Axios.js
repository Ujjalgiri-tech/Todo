import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:1337/api", // change if your Strapi runs on another port
});

// Attach JWT automatically to requests
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default Axios;
