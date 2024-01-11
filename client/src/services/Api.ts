import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

export const addUser = async (data: object) => {
  try {
    const res = await axios.post(`${url}/add`, data);
    return res.data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getUser = async (id: object) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res;
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

export const getMessages = async (id: any) => {
  try {
    const res = await axios.get(`${url}/message/get/${id}`);
    return res.data.data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};

export const newMessage = async (data: any) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (err) {
    console.log("Error while getting user", err);
    return err;
  }
};

export const getUsers = async (id: any) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
