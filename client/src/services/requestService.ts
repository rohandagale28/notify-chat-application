import axios from "axios";

const url = "http://localhost:5000"; //base url  ----> IMP

export const sendRequest = async (senderId: string, receiverId: string) => {
  try {
    const res = await axios.post(
      `${url}/request/new`,
      { sender: senderId, receiver: receiverId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const acceptRequest = async (senderId: string, receiverId: string) => {
  try {
    const res = await axios.post(
      `${url}/request/update`,
      { sender: senderId, receiver: receiverId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
