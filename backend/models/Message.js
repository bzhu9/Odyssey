const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Security question not added yet
const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
    }
},
{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;