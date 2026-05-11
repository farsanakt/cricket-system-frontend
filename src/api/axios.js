import axios from "axios"

const API = axios.create({
  baseURL: "https://cricket-backend-chwe.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// 🔥 Optional: Add token automatically later
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token")
//   if (token) req.headers.Authorization = `Bearer ${token}`
//   return req
// })

export default API