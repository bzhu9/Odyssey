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

// Get all subjects --------------------
router.route("/getAllSubjects").get(async (req, res) => {
    try {
      const subjects = await Course.distinct("subject");
      console.log(subjects);
      res.status(200).json({ subjects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

// Get all course with the subject --------------------
router.route("/subject").get((req, res) => {
    Course.find({
        subject: req.body.subject
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

// Get the maximum and minimum level of the courses given the subject ------
router.route("/level").get((req, res) => {
    Course.find({
        subject: req.body.subject
    }, (err, courses) => {
        if (err) {
            res.status(500).send(err);
        } else {
            //console.log(courses);
            console.log(courses.length);
            let min = Infinity;
            let max = -Infinity;
            for (let i = 0; i < courses.length; i++) {
                const course = courses[i];
                const number = course.number;
                console.log(number)
                if (number < min) {
                    min = number;
                }
                if (number > max) {
                    max = number;
                }
            }
            const minDigit = parseInt(min.toString()[0]);
            const maxDigit = parseInt(max.toString()[0]);
            res.send({
                minLevel: minDigit,
                maxLevel: maxDigit
            });
        }
    });
});

  

// Get all course with the subject & number --------------------
router.route("/subjectnumber").get((req, res) => {
    Course.find({
        subject: req.body.subject,
        number: req.body.number
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

// Get all course with the professor --------------------
router.route("/professor").get((req,res) => {
    Course.find({
        professor: req.body.professor
    })
    .then(courses => res.json(courses))
    .catch(err => console.err(err))
})

// Add a course --------------------
router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newCourse = new Course({
        "name": name
    });

    newCourse.save()
        .then(() => res.status(201).json("Course added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

// removes all course with the subject --------------------
router.route('/clear').post(async (req, res) => {
    const status = await Course.deleteMany({});
    res.status(200).json({message: 'cleared'})
})

// add the reviews and users when importing courses --------------------
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

// add the total score and review count when importing courses --------------------
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

// Get all the reviews for a course --------------------
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