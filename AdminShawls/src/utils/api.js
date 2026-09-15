// // src/utils/api.js
// import axios from "axios";

// const BASE_URL = "http://localhost:5000";

// const API = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export { BASE_URL };
// export default API;




import axios from "axios";

// Local development → localhost
// Vercel production → Render backend
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://ecommerce-website-ggui.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { BASE_URL };
export default API;