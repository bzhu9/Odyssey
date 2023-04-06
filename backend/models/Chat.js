const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Security question not added yet
const chatSchema = new Schema({
    messages: [{
        type: Schema.Types.ObjectId,
        required: true,
    }],
    users: [{
        type: Schema.Types.ObjectId,
        required: true,
    }],
    isGroup: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;