const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    Name: {
        type: String,
        require: false,
    },
    Section: {
        type: String,
        require: false,
    },
    StartTime: {
        type: Date,
        require: true,
    },
    EndTime: {
        type: Date,
        require: true,
    },
    Building: {
        type: String,
        require: true,
    },
    Room: {
        type: String,
        require: true,
    },
    Capacity: {
        type: Number,
        require: true,
    },
    Address: {
        type: String,
        require: false,
    },
    Lat: {
        type: Number,
        require: true,
    },
    Long: {
        type: Number,
        require: true,
    }
});

const OpenClass = mongoose.model("OpenClass", openClassSchema);

module.exports = OpenClass;