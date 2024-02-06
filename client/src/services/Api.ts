import axios from "axios";

const url = "http://localhost:5000";

//==========||  actions types user ||===========//
export const addUser = async (data: object) => {
  try {
    const response = await axios.post(`${url}/add`, data);
    return response;
  } catch (error) {
    console.log("Error in adding a new User", error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${url}/get/${id}`);
    console.log(response);
    return response;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};

export const createConversation = async (data: object) => {
  try {
    const res = await axios.post(`${url}/conversation`, data);
    return res.data.data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};

export const getMessages = async (id: string) => {
  try {
    const res = await axios.get(`${url}/message/get/${id}`);
    return res.data.data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};

export const newMessage = async (data: object) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (err) {
    console.log("Error while getting user", err);
    return err;
  }
};

export const getUsers = async (id: string) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
