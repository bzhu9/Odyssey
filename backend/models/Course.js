const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId
    }],
    users: [{
        //list of _id's
        type: Schema.Types.ObjectId
    }]
})


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;