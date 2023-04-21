const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId
    }],
    users: [{
        //list of _id's
        type: Schema.Types.ObjectId
    }],
    totalscore: {
        type: Number
    },
    reviewcount: {
        type: Number
    }, 
    avgRating: {
        type: Number
    }
})


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;