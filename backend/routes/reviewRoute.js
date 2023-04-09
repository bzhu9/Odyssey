const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');

// Get all reviews --------------------------------
router.route("/").get((req, res) => {
    Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

// Add a review --------------------------------
router.route('/add').post((req, res) => {
    const text = req.body.text;
    const user = req.body.user;
    const course = req.body.course;

    const newReview = new Review({
        "text": text,
        "user": user,
        "course": course
    });

    newReview.save()
        .then(() => res.status(201).json("Review added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Delete a review --------------------------------
router.route('/delete').post((req, res) => {
    const id = req.body._id;
    const review = await Event.findOne({_id: id}).exec();

    if (!review) {
        return res.status(400).json({ message: "Review not found"});
    }

    //get the user
    const user = await User.findOne({_id: review.user});
    if (!user) {
        return res.status(400).json({ message: "User not found"});
    }
    //delete the review from the user
    if (user.reviews.includes(review._id)) {
        user.reviews.splice(user.reviews.indexOf(review._id),1);
        user.save()
            .catch(err => res.status(400).json({message: 'User Delete Review Error: ' + err}));
    }
    //get the course
    const course = await Course.findOne({_id: review.course});
    if (!course) {
        return res.status(400).json({ message: "Course not found"});
    }
    //delete the review from the course
    if (course.reviews.includes(review._id)) {
        course.reviews.splice(course.reviews.indexOf(review._id),1);
        course.save()
            .catch(err => res.status(400).json({message: 'Course Delete Review Error: ' + err}));
    }

    //delete the review
    const result = await review.deleteOne();

    res.status(200).json({ message: `Review, was deleted successfully` })

});

module.exports = router;