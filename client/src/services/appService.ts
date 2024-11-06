import axios from 'axios'

const url = import.meta.env.VITE_REST_URL

/*-------------------- Converstion List ----------------------*/
export const getConverstionList = async (id: string) => {
  try {
    const res = await axios.get(`${url}/dashboard/conversation/${id}`, { withCredentials: true })
    return res.data
  } catch (error) {
    return error
  }
}

/*-------------------- Create New Conversation ---------------*/
export const createConversation = async (data: object) => {
  try {
    const res = await axios.post(`${url}/dashboard/conversation/add`, data, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return err
  }
}
