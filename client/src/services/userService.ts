import axios from 'axios'

const url = import.meta.env.VITE_REST_URL

//==========|| searching user with parameter ||==========//
export const searchUser = async (id: string) => {
  try {
    const response = await axios.get(`${url}/get/${id}`, {
      withCredentials: true,
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error making request:', error)
  }
}

//==========|| parameter query for contactList using _id ||==========//
export const getUsers = async (account: any) => {
  try {
    const response = await axios.get(`${url}/request/contact/${account?._id}`, {
      withCredentials: true,
    })
    return response
  } catch (error) {}
}
