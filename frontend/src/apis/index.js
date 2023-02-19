import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:3500"
});

export const insertUser = payload => api.post("/user/add", payload);
export const getAllUsers = () => api.get("/user");

const apis = {
    insertUser,
    getAllUsers,
}

export default apis;