const mongoose = require('mongoose');

const Schema = mongoose.Schema;


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
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
      }
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;