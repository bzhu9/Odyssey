const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Security question not added yet
const reviewSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;