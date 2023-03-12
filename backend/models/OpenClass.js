const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    startTimeHour: {
        type: Number,
        required: true,
    },
    startTimeMinute: {
        type: Number,
        required: true,
    },
    endTimeHour: {
        type: Number,
        require: true,
    },
    endTimeMinute: {
        type: Number,
        require: true,
    },
    building: {
        type: String,
        require: true,
    },
    room: {
        type: String,
        require: true,
    },
    lat: {
        type: Number,
        require: true,
    },
    long: {
        type: Number,
        require: true,
    },
});

const OpenClass = mongoose.model("OpenClass", openClassSchema);

module.exports = OpenClass;