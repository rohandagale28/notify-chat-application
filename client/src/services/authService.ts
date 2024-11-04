import axios from 'axios'

const url = import.meta.env.VITE_REST_URL

// Login user
export const loginUser = async (formData: Object) => {
  try {
    const res = await axios.post(`${url}/login`, formData, {
      withCredentials: false,
    })
    if (res.status == 200) return res
  } catch (error) {
    return error
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    const res = await axios.post(`${url}/logout`, { withCredentials: true })
    if (res.status == 200) return res
  } catch (error) {
    return error
  }
}
