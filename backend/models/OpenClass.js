const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    room: {
        type: Number,
        required: true
    }
    // latitude: {
    //     type: Number,
    //     required: true,
    //     min: -90,
    //     max: 90
    //   },
    //   longitude: {
    //     type: Number,
    //     required: true,
    //     min: -180,
    //     max: 180
    //   }
});

const OpenClass = mongoose.model("OpenClass", openClassSchema);

module.exports = OpenClass;