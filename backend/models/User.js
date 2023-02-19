const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const securityQuestions = {
    Street: "What is the name of the street of the first house you lived in?",
    Mother: "What is your mother's maiden name?",
    Friend: "What is your best friend's first name?"
};

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
    password: {
        type: String,
        required: true,
    },
    securityQ: {
        type: String,
        enum: securityQuestions,
        required: true,
    },
    securityA: {
        type: String,
        reqired: true,
    },
    status: {
        type: String,
        default: "Offline"
    },
    calendar: {
        type: String
    },
    friends: [{
        // list of _id's
        type: ObjectId
    }],
    publicity: {
        type: String,
        default: "Public"
    },
    // add nutritional preferences: list of enums
        // vegetarian
        // vegan
        // gluten free
        // none
    // add work time: tuple(string start, string end)
    // add meal time: event
    // add course list 
    // add socials (instagram, facebook, linkedin...)
    // add friendsRequests
});

const User = mongoose.model("User", userSchema);

module.exports = User;