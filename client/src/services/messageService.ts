import axios from 'axios'

const url = import.meta.env.VITE_REST_URL

/*--------------------- Add New Message ----------------------*/
export const addMessage = async (message: object) => {
  try {
    const response = await axios.post(`${url}/message/add`, message, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return error
  }
}
