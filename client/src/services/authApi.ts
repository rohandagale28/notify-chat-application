import axios from 'axios';

const url = "http://localhost:5000" //base url  ----> IMP


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