const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    name: {
        type: String,
        require: false,
    },
    section: {
        type: String,
        require: false,
    },
    startTime: {
        type: Date,
        require: true,
    },
    endTime: {
        type: Date,
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
    capacity: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: false,
    },
    lat: {
        type: Number,
        require: true,
    },
    long: {
        type: Number,
        require: true,
    }
});

const OpenClass = mongoose.model("OpenClass", openClassSchema);

module.exports = OpenClass;