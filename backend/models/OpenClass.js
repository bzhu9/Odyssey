const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    date: {
        type: String,
        require: false,
    },
    startString: {
        type: String,
        require: false,
    },
    endString: {
        type: String,
        require: false,
    },
    location: {
        type: String,
        require: true,
    },
    capacity: {
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
    address: {
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
    startTime: {
        type: Number,
        require: true,
    },
    endTime: {
        type: Number,
        require: true,
    }
});

const OpenClass = mongoose.model("OpenClass", openClassSchema);

module.exports = OpenClass;