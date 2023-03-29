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
    password: {
        type: String,
        required: true,
    },
    seq1: {
        type: String,
        required: true,
    },
    seq2: {
        type: String,
        required: true,
    },
    seq3: {
        type: String,
        required: true,
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
        type: Schema.Types.ObjectId
        // user.friends.push(newFriend._id);
    }],
    friend_reqs: [{
        //list of _id's
        type: Schema.Types.ObjectId
    }],
    sent_reqs: [{
        //list of _id's
        type: Schema.Types.ObjectId
    }],
    privacy: {
        type: String,
        default: "Public"
    },
    events: [{
        //not required for now
        type: Schema.Types.ObjectId,
    }],
    req_events: [{
        //not required for now
        type: Schema.Types.ObjectId,
    }]
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