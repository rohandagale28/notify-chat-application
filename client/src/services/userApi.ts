import axios from 'axios';

const url = "http://localhost:5000" //base url  ----> IMP


//==========|| verify me request with cookies||==========//
export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/dashboard`, { withCredentials: true });
    return res;
  } catch (error) {
    throw error;
  }
};

//==========|| searching user with parameter ||==========//
export const searchUser = async (id: string) => {
  try {
    const response = await axios.get(`${url}/dashboard/${id}`, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error('Error making request:', error);
  }
};

//==========|| parameter query for contactList using _id ||==========//
export const getUsers =async(account: any)=>{
  try {
    const response = await axios.get(`${url}/request/contact/${account?._id}`, {
      withCredentials: true,
    });
    return response
  } catch (error) {
    
  }
}



export const createConversation = async (data: object) => {
  try {
    const res = await axios.post(`${url}/dashboard/conversation`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.log("Error", err);
    return err
  }
};