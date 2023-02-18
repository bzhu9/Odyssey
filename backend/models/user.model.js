const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Security question not added yet
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: ""
    },
    calendar: {
        type: String
    },
    friends: {
        // list of _id's
        type: [ObjectId]
    },
    publicity: {
        type: String,
        default: "Public"
    },
    // add nutritional preferences
    // add work time
    // add meal time
    // add course list
    // add socials
    // add friendsRequests
});

const User = mongoose.model("User", userSchema);

module.exports = User;