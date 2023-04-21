const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');
// const { default: apis } = require('../../frontend/src/apis');

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
router.route('/add').post(async (req, res) => {
    const text = req.body.text;
    const user = req.body.user;
    const course = req.body.course;
    const stars = req.body.stars;

    //get course object
    const courseObj = await Course.findById(course);
    //console.log(courseObj);
    //get the user object
    const userObj = await User.findById(user);
    let hasReview = false;
    let r;
    console.log(courseObj.reviews.length);
    for (let i = 0; i < courseObj.reviews.length; i++) {
        //get the review ID
        r = await Review.findById(courseObj.reviews[i]);
        // console.log("this is the course");
        // console.log(r);
        // console.log("this is the user");
        // console.log(userObj);
        // console.log("comparing:");
        // console.log(r.user.equals(userObj._id));
        
        //if the review has already been made
        if (r.user.equals(userObj._id)) {
            hasReview = true;
        }
        //check if the review has the same user
        console.log(typeof r.user);
        console.log(typeof userObj._id);
    }
    //find out if the course already has a review
    //if not then continue with adding the review
/*
    
*/
    if (hasReview) {
        return res.status(200).json({message: "hasReview"});
    } else {
            //create the new review
        const newReview = new Review({
            "text": text,
            "user": user,
            "course": course,
            "stars": stars
        });
        newReview.save()
            .catch(err => res.status(400).json("Error: " + err));

        if (!courseObj) {
            //course doesnt exist
            console.log("course doesn't exist????");
        }
        //add review
        courseObj.reviews.push(newReview._id);
        //update total score
        courseObj.totalscore = courseObj.totalscore + stars;
        //update total rewiews
        courseObj.reviewcount = courseObj.reviewcount + 1;
        //update the avg score
        courseObj.avgRating = (courseObj.totalscore / courseObj.reviewcount).toFixed(2);
        //save course obj
        courseObj.save()
            .catch(err => res.status(400).json({message: 'Error: ' + err}));

        //add the review id to the user
        if (!userObj) {
            //user doesn't exist
            console.log("user doesn't exist????");
        }
        userObj.reviews.push(newReview._id);
        userObj.save()
            .catch(err => res.status(400).json({message: 'Error: ' + err}));
    
        return res.status(200).json({message: "Review added!"});
    }
});

// Delete a review --------------------------------
router.route('/delete').post(async (req, res) => {
    const id = req.body._id;
    const review = await Review.findOne({_id: id}).exec();

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
        //update the review score & count
        course.totalscore = course.totalscore - review.stars;
        course.reviewcount = course.reviewcount - 1;
        //update the avgRating
        if (course.reviewcount > 0)
            course.avgRating = (course.totalscore / course.reviewcount).toFixed(2);
        else
            course.avgRating = -1;

        course.save()
            .catch(err => res.status(400).json({message: 'Course Delete Review Error: ' + err}));
    }

    //delete the review
    const result = await review.deleteOne();

    res.status(200).json({ message: `Review, was deleted successfully` })

});

// Edit a review --------------------------------
router.route('/edit').post(async (req, res) => {
    const text = req.body.text;
    const reviewID = req.body.reviewID;
    const stars = req.body.stars;
    //update the reviewObj
    console.log("reviewID: "); 
    console.log(reviewID);
    const reviewObj = await Review.findOne({_id: reviewID}).exec();
    if (stars != reviewObj.stars) {
        //get the course
        //this line might be wrong have to test it still
        console.log("reviewObj.course");
        console.log(reviewObj.course);
        const course = await Course.findOne({_id: reviewObj.course});
        console.log("course");
        console.log(course);
        if (course.reviews.includes(reviewObj._id)) {
            //update the total score
            course.totalscore = course.totalscore - reviewObj.stars + stars;
            //update the avg rating
            course.avgRating = (course.totalscore / course.reviewcount).toFixed(2);
            course.save()
                .catch(err => res.status(400).json({message: 'Course Edit Review Error: ' + err}));
        }

        //update stars
        reviewObj.stars = stars;
    }
    //update the review
    reviewObj.text = text;

    //save the review obj
    reviewObj.save()
        .catch(err => res.status(400).json({message: 'ReviewObj Edit Review Error: ' + err}));

    return res.status(200).json("Review successfully editted!");
});

module.exports = router;