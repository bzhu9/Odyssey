const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');
const { default: apis } = require('../../frontend/src/apis');

// Get all reviews --------------------------------
router.route("/").get((req, res) => {
    Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

// Get a signal review --------------------------------
router.route("/single").post((req, res) => {
    const reviewID = req.body.reviewID;
    Review.findOne({_id: reviewID}).lean()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

// Add a review --------------------------------
router.route('/add').post((req, res) => {
    const text = req.body.text;
    const user = req.body.user;
    const course = req.body.course;

    //create the new review
    const newReview = new Review({
        "text": text,
        "user": user,
        "course": course
    });
    newReview.save()
        .catch(err => res.status(400).json("Error: " + err));

    //add the review id to the course
    const courseObj = await Course.findById(course);
    if (!courseObj) {
        //course doesnt exist
        console.log("course doesn't exist????");
    }
    courseObj.reviews.push(newReview._id);
    courseObj.save()
        .catch(err => res.status(400).json({message: 'Error: ' + err}));

    //add the review id to the user
    const userObj = await User.findById(user);
    if (!userObj) {
        //user doesn't exist
        console.log("user doesn't exist????");
    }
    userObj.reviews.push(newReview._id);
    userObj.save()
        .catch(err => res.status(400).json({message: 'Error: ' + err}));
    
    
    return res.status(200).json("Review added!");
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

// Edit a review --------------------------------
router.route('/edit').post((req, res) => {
    const text = req.body.text;
    const reviewID = req.body.reviewID;

    await Review.findOneAndUpdate({_id: reviewID}, {text: text}).lean();

    return res.status(200).json("Review editted!");
});

module.exports = router;