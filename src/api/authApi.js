import API from "./axios"

// 🔥 LOGIN API
export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data)
    console.log(res.data,'koooooooo')
    return res.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getPlayer = (id) => API.get(`/player/${id}`)
export const createReport = (data) => API.post("/report", data)