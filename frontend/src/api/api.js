import axios from "axios";

const API_URL = "http://localhost:5000";

export const signup = async (email, password) => {
    return await axios.post(`${API_URL}/signup`, { email, password });
};

export const signin = async (email, password) => {
    return await axios.post(`${API_URL}/signin`, { email, password });
};
