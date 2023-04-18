const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    }
})


const note = mongoose.model("Note", noteSchema);

module.exports = note;