import axios from "axios";

const url = "http://localhost:5000/dashboard"

export const getUsers = async (id: string) => {
    try {
        const response = await axios.get(`${url}/${id}`, {
            withCredentials: true,  // Include cookies with the request
        });
        return response.data
    } catch (error) {
        console.error('Error making request:', error);
    }
};
