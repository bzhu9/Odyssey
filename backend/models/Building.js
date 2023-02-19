const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Security question not added yet
const buildingSchema = new Schema({
    virtual: {
        type: Boolean,
        required: true,
    },
    abbrev: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    openTime: {
        type: Date,
        required: true,
    },
    closeTIme: {
        type: Date,
        required: true,
    },
    longitude: {
        type: Double,
        required: true,
    },
    latitude: {
        type: Double,
        default: "Offline"
    }
});

const User = mongoose.model("Building", buildingSchema);

module.exports = Building;