const router = require('express').Router();
let Review = require('../models/Review');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Get all reviews --------------------------------
router.route("/").get((req, res) => {
    Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

// Add a review
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

module.exports = router;