const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personalNoteSchema = new Schema({
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


const personalNote = mongoose.model("PersonalNote", personalNoteSchema);

module.exports = personalNote;