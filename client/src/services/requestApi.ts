import axios from "axios";

const url = "https://notify-chat-application-serv-git-6dffe8-rohandagale28s-projects.vercel.app" //base url  ----> IMP

export const sendRequest = async (senderId: string, receiverId: string) => {
    try {
        const res = await axios.post(`${url}/request/new`, { sender: senderId, receiver: receiverId }, { withCredentials: true });
        return res;
    } catch (error) {
        throw error;
    }
};


export const acceptRequest = async (senderId: string, receiverId: string) => {
    try {
        const res = await axios.post(`${url}/request/update`, { sender: senderId, receiver: receiverId }, { withCredentials: true });
        return res;
    } catch (error) {
        throw error;
    }
};

