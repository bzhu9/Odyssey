const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const openClassSchema = new Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    room: {
        type: String,
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