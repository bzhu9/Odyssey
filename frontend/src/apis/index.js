import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:3500"
});

export const insertUser = payload => api.post("/user/add", payload);
export const loginUser = payload => api.post("user/login", payload);
export const resetUser = payload => api.post("user/reset", payload);
export const getAllUsers = () => api.get("/user");
export const getUser = payload => api.post("/user", payload);
export const deleteUser = payload => api.post("/user/delete", payload);

export const insertEvent = payload => api.post("/event/add", payload);
export const getAllEvents = () => api.get("/event");

const apis = {
    insertUser,
    loginUser,
    resetUser,
    getAllUsers,
    deleteUser,

    insertEvent,
    getAllEvents
}

export default apis;