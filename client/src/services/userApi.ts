import axios from 'axios';

const url = "http://localhost:5000"

export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/dashboard`, { withCredentials: true });
    return res;
  } catch (error) {
    throw error;
  }
};

export const createConversation = async (data: object) => {
  try {
    const res = await axios.post(`${url}/dashboard/conversation`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.log("Error", err);
    return err
  }
};