const router = require('express').Router();
let Course = require('../models/Course');
let Review = require('../models/Review');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { RestartProcess } = require('concurrently');

// Get all courses --------------------------------
router.route("/").get((req, res) => {
    Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error: " + err));
});

// Get a single course by ID --------------------------------------
router.route('/single/:_id').get(async (req, res) => {
    Course.findOne({ _id: req.params._id }).lean()
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get one course using courseID --------------------
router.route("/getWithID").post(async (req, res) => {
    const id = req.body.id;
    const course = await Course.findOne({ _id: id }).lean();
    return res.status(200).json({ course: course });
});

router.route("/subject").get((req, res) => {
    Course.find({
        subject: req.body.subject
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

router.route("/subjectnumber").get((req, res) => {
    Course.find({
        subject: req.body.subject,
        number: req.body.number
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

router.route("/professor").get((req,res) => {
    Course.find({
        professor: req.body.professor
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newCourse = new Course({
        "name": name
    });

    newCourse.save()
        .then(() => res.status(201).json("Course added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/clear').post(async (req, res) => {
    const status = await Course.deleteMany({});
    res.status(200).json({message: 'cleared'})
})

router.route('/fixformat').post(async (req, res) => {
    const status = await Course.updateMany(
        {
            $set: {
                reviews: [],
                users: [],
            }   
        }
    );
    res.status(200).json({message: 'fixed'})
})

router.route('/addscore').post(async (req, res) => {
    const status = await Course.updateMany(
        {
            $set: {
                totalscore: 0,
                reviewcount: 0
            }   
        }
    );
    res.status(200).json({message: 'added'})
})
router.route("/getReviews").post(async (req, res) => {
    const id = req.body.id;
    const course = await Course.findOne({ _id: id })
    .catch(err => res.status(400).json("Error: " + err));
    
    if (course) {
        // console.log("this is the course");
        // console.log(course);
        let reviewList = [];
        //console.log("course review length " + course.reviews.length);
        for (let i = 0; i < course.reviews.length; i++) {
            let id = course.reviews[i];
            // have to have _id, or else it will search friends list too
            let review = await Review.findOne({ _id: id }).lean();
            if (review) {
                reviewList.push({
                    text: review.text,
                    stars: review.stars,
                    user: review.user,
                    course: review.course,
                    _id: review._id
                });
            }
        }
        res.status(200).json(reviewList);
    }
    else {
        res.status(401).json({ message: "ID does not exist" });
    }
})

module.exports = router;