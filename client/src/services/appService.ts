import axios from "axios"

const url = import.meta.env.VITE_REST_URL

export const getConverstionList = async (id: string) => {
  try {
    const res = await axios.get(`${url}/request/contact/${id}`, { withCredentials: true })
    return res.data
  } catch (error) {
    return error
  }
}
