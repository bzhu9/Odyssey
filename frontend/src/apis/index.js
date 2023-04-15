import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:3500"
});

//user apis ------------------------------------------------------------------
export const insertUser = payload => api.post("/user/add", payload);
export const loginUser = payload => api.post("user/login", payload);
export const resetUser = payload => api.post("user/reset", payload);
export const getAllUsers = () => api.get("/user");
export const getUser = payload => api.post("/user", payload);
export const getUserWithID = payload => api.post("/user/getWithID", payload);
export const getUserID = payload => api.post("/user/getID", payload);
export const deleteUser = payload => api.post("/user/delete", payload);
export const changeEmail = payload => api.post("/user/email", payload);
export const getEventRequests = payload => api.post("/user/getEventRequests", payload);


//event apis ----------------------------------------------------------------------------------
export const insertEvent = payload => api.post("/event/add", payload);
export const getAllEvents = () => api.get("/event");
export const getUsersEvents = payload => api.post("/event/getUsersEvents", payload);
export const deleteEvent = payload => api.post("/event/delete", payload);
export const editEvent = payload => api.post("/event/edit", payload);
export const getSingleEvent = id => api.get(`/event/single/${id}`);
export const acceptEventRequest = payload => api.post("/event/acceptEventRequest", payload);
export const deleteEventRequest = payload => api.post("/event/deleteEventRequest", payload);

//friends apis ---------------------------------------------------------------------------------
export const getFriends = payload => api.post("/user/getFriends", payload);
export const getFriendRequests = payload => api.post("/user/getFriendRequests", payload);
export const sendFriendRequest = payload => api.post("/friend/sendFriendRequest", payload);
export const acceptFriendRequest = payload => api.post("/friend/acceptFriendRequest", payload);
export const deleteFriendRequest = payload => api.post("/friend/deleteFriendRequest", payload);
export const isFriend = payload => api.post("/friend/isFriend", payload);


//user privacy apis ----------------------------------------------------------
export const getPrivacy = payload => api.post("/user/getPrivacy", payload);
export const setPrivacy = payload => api.post("/user/setPrivacy", payload);
export const getStatus = payload => api.post("/user/getStatus", payload);
export const setStatus = payload => api.post("/user/setStatus", payload);
export const setWorkday = payload => api.post("/user/setWorkday", payload);
export const getWorkday = payload => api.post("/user/getWorkday", payload);


//class apis ------------------------------------------------------------------
// export const searchOpenClass = payload => api.get("/openclass", payload);
export const searchOpenClass = payload => api.post("/openclass", payload);

//courses apis ---------------------------------------------------------------
export const getAllCourses = () => api.get("/course");
export const getMyCourses = payload => api.post("/user/getCourses", payload);
export const setCourses = payload => api.post("/user/setCourses", payload);

//message api -----------------------------------------------------------------
export const sendMessage = payload => api.post("/message/send", payload);
export const createChat = payload => api.post("/chat/create", payload);
export const getChats = payload => api.post("/user/getChats", payload);
export const addUserToChat = payload => api.post("/chat/addUser", payload);
export const loadMessages = payload => api.post("/chat/loadMessages", payload);

//reviews api -------------------------------------------------------------------------
export const getAllReviews = () => api.get("/review/");
export const addReview = payload => api.post("/review/add", payload);
export const editReview = payload => api.post("/review/edit", payload);
export const getSingleReview = payload => api.get("/review/single", payload);


const apis = {
    insertUser,
    loginUser,
    resetUser,
    getUserWithID,
    getAllUsers,
    getUser,
    getUserID,
    deleteUser,
    changeEmail,

    insertEvent,
    getAllEvents,
    getUsersEvents,
    deleteEvent,
    editEvent,
    getSingleEvent,

    getFriends,
    getFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    deleteFriendRequest,
    isFriend,

    getEventRequests,
    acceptEventRequest,
    deleteEventRequest,

    getPrivacy,
    setPrivacy,
    getStatus,
    setStatus,
    setWorkday,
    getWorkday,

    searchOpenClass,
    
    getAllCourses,
    getMyCourses,
    setCourses,

    sendMessage,
    createChat,
    getChats,
    addUserToChat,
    loadMessages,

    getAllReviews,
    addReview,
    editReview,
    getSingleReview,


}

export default apis;