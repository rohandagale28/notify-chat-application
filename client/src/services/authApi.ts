import axios from 'axios';

// base url  ----> IMP
const url = import.meta.env.VITE_REST_URL

//==========|| login function ||==========//
export const loginUser = async (formData: Object) => {
    try {
        const res = await axios.post(`${url}/login`, formData, { withCredentials: true })
        if (res.status == 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
};