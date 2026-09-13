// src/utils/api.js
import axios from "axios";

const BASE_URL = "https://ecommerce-website-ggui.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { BASE_URL };
export default API;