const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Review Schema
// each review will be linked to both a user and a course
// reviews should stay even if an account is deleted
const reviewSchema = new Schema({
    stars: {
        type: Number,
        requred: true
    },
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    course: {
        //if empty, then it should be listed as a personal note
        type: Schema.Types.ObjectId
    }
}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;