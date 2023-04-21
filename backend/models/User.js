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
    }],
    courses: [{
        type: Schema.Types.ObjectId
    }],
    reviews: [{
        type: Schema.Types.ObjectId
    }],
    personalNotes: [{
        type: Schema.Types.ObjectId
    }],
    // Stored in 24hr format hh:mm
    workdayStart: {
        //mongo will format it in its own way
        type: String
    },
    workdayEnd: {
        type: String
    },
    mealTimeStart: {
        type: String
    },
    mealTimeEnd: {
        type: String
    },
    chats: [{
        type: Schema.Types.ObjectId  
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;