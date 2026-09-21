// src/utils/api.js
import axios from "axios";

const BASE_URL = "https://ecommerce-website-ggui.onrender.com";//http://localhost:5000

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { BASE_URL };
export default API;




