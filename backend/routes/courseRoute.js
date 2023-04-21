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
        //console.log(subjects);
        res.status(200).json({ subjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
// Get all professors --------------------
router.route("/getAllProfessors").get(async (req, res) => {
    try {
        const professor = await Course.distinct("professor");
        //console.log(professor);
        res.status(200).json({ professor });
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

// get a list of all the courses with the Subject, level, prof ------------
router.route('/searchCourse').post(async (req, res) => {
    console.log("here");
    level = Number(req.body.level);
    subject = req.body.subject;
    prof = req.body.professor;
    avgrating = Number(req.body.rating);

    console.log(subject);
    console.log(prof);
    console.log(level);
    console.log(avgrating);
    if ((subject !== null) && (req.body.level === null) && (prof === null)  && (req.body.rating === null)) {
        console.log("sub");
        //subject only has values
        const c = await Course.find({ 
            subject: subject,
        });
        res.send(c);
    } else if ((subject !== null) && (req.body.level !== null) && (prof === null) && (req.body.rating === null)) {
        //department & level
        console.log("sub + lvl");
        const c = await Course.find({ 
            subject: subject,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    } else if ((subject !== null) && (req.body.level === null) && (prof !== null)  && (req.body.rating === null)) {
        //department & prof
        console.log("sub + prof");
        const c = await Course.find({ 
            subject: subject,
            professsor: prof,
        });
        res.send(c);
    } else if ((subject !== null) && (req.body.level !== null) && (prof !== null)  && (req.body.rating === null)) {
        //department & level & prof
        console.log("dept + lvl + prof");
        const c = await Course.find({ 
            subject: subject,
            professor: prof,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    } else if ((subject === null) && (req.body.level !== null) && (prof === null)  && (req.body.rating === null)) {
        //level
        console.log("lvl");
        const c = await Course.find({ 
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    } else if ((subject === null) && (req.body.level !== null) && (prof !== null)  && (req.body.rating === null)) {
        //level & prof
        console.log("lvl + prof");
        const c = await Course.find({ 
            professor: prof,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    } else if ((subject === null) && (req.body.level === null) && (prof !== null)  && (req.body.rating === null)) {
        //prof
        console.log("prof");
        const c = await Course.find({ 
            professor: prof,
        });
        res.send(c);
    } else if ((subject === null) && (req.body.level === null) && (prof === null)  && (req.body.rating !== null)) {
        //rating
        console.log("rating");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating }
        });
        res.send(c);
    }  else if ((subject !== null) && (req.body.level === null) && (prof === null)  && (req.body.rating !== null)) {
        //rating subject
        console.log("rating subject");
        const c = await Course.find({ 
            subject: subject,
            avgRating: { $gte: avgrating }
        });
        res.send(c);
    } else if ((subject === null) && (req.body.level !== null) && (prof === null)  && (req.body.rating !== null)) {
        //rating level
        console.log("rating level");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating },
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }

        });
        res.send(c);
    } else if ((subject === null) && (req.body.level === null) && (prof !== null)  && (req.body.rating !== null)) {
        //rating prof
        console.log("prof");
        const c = await Course.find({ 
            professor: prof,
            avgRating: { $gte: avgrating },
        });
        res.send(c);
    }  else if ((subject !== null) && (req.body.level !== null) && (prof === null)  && (req.body.rating !== null)) {
        //rating subject level
        console.log("prof");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating },
            subject: subject,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    }  else if ((subject !== null) && (req.body.level === null) && (prof !== null)  && (req.body.rating !== null)) {
        //rating subject prof
        console.log("prof");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating },
            subject: subject,
            professor: prof,
        });
        res.send(c);
    }  else if ((subject === null) && (req.body.level !== null) && (prof !== null)  && (req.body.rating !== null)) {
        //rating level prof
        console.log("prof");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating },
            professor: prof,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    } else if ((subject !== null) && (req.body.level !== null) && (prof !== null)  && (req.body.rating !== null)) {
        //sub lvl prof rating
        console.log("all");
        const c = await Course.find({ 
            avgRating: { $gte: avgrating },
            subject: subject,
            professor: prof,
            number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
        });
        res.send(c);
    }
    
    else {
        console.log("wtf how did it end up here")
    }
    // const c = await Course.find({
    //     subject: subject,
    //     professor: prof,
    //     number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
    // });
    //console.log(c);
    // res.send(c);
    // .then(courses => res.json(courses))
    // .catch(err => console.err(err));
});




// Get all the levels with the specified subject & prof ------------
router.route('/level/subjectProf').post(async (req, res) => {
    //console.log("name:");
    //console.log(req.body.professor);
    const c = await Course.find({
        subject: req.body.subject,
        professor: req.body.professor
    }).distinct("number");
    //console.log(c);
    if (c) {
        //loop though
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < c.length; i++) {
            const num = c[i];
            if (num < min) {
                min = num;
            }
            if (num > max) {
                max = num;
            }
        }
        const minDigit = parseInt(min.toString()[0]);
        const maxDigit = parseInt(max.toString()[0]);
        res.send({
            minLevel: minDigit,
            maxLevel: maxDigit
        });
    }
    // .then(courses => res.json(courses))
    // .catch(err => console.err(err));
});



// Get all the profs with the specified subject and level ------------
router.route('/professor/subjectLevel').post(async (req, res) => {
    //console.log("subject: " + req.body.subject);
    //console.log("level: " + req.body.level);
    const level = Number(req.body.level);
    Course.find({
        subject: req.body.subject,
        number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
    })
        .distinct("professor")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});

// Get all the subjects with the specified prof and level ------------
router.route('/subject/levelProf').post(async (req, res) => {
    const level = Number(req.body.level);
    Course.find({
        professor: req.body.professor,
        number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
    })
        .distinct("subject")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});

// Get all the subjects with the specified prof ------------
router.route('/subject/professor').post(async (req, res) => {
    //console.log("name:" + req.body.professor);
    Course.find({
        professor: req.body.professor
    })
        .distinct("subject")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});

// Get all the levels with the specified prof ------------
router.route('/level/professor').post(async (req, res) => {
    //console.log("name:");
    //console.log(req.body.professor);
    const c = await Course.find({ professor: req.body.professor }).distinct("number");
    //console.log(c);
    if (c) {
        //loop though
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < c.length; i++) {
            const num = c[i];
            if (num < min) {
                min = num;
            }
            if (num > max) {
                max = num;
            }
        }
        const minDigit = parseInt(min.toString()[0]);
        const maxDigit = parseInt(max.toString()[0]);
        res.send({
            minLevel: minDigit,
            maxLevel: maxDigit
        });
    }
    // .then(courses => res.json(courses))
    // .catch(err => console.err(err));
});

// Get all the professors with the specified subject ------------
router.route('/professors/subject/:id').get(async (req, res) => {
    Course.find({
        subject: req.params.id
    })
        .distinct("professor")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});

// Get all the professors with the specified level ------------
router.route('/professors/level/:id').get(async (req, res) => {
    level = Number(req.params.id);
    console.log(typeof level);
    //console.log(level);
    Course.find({
        number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
    })
        .distinct("professor")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});

// Get all the subjects with the specified level ------------
router.route('/subject/level/:id').get(async (req, res) => {
    level = Number(req.params.id);
    console.log(typeof level);
    //console.log(level);
    Course.find({
        number: { $gte: 10000 * level, $lt: 10000 * (level + 1) }
    })
        .distinct("subject")
        .then(courses => res.json(courses))
        .catch(err => console.err(err));
});


// Get the maximum and minimum level of the courses given the subject ------
router.route('/level/:id').get(async (req, res) => {
    //console.log(req.params.subject);
    Course.find({
        subject: req.params.id
    }, (err, courses) => {
        //console.log(courses);
        if (err) {
            res.status(500).send(err);
        } else {
            //console.log(courses);
            //console.log(courses.length);
            let min = Infinity;
            let max = -Infinity;
            for (let i = 0; i < courses.length; i++) {
                const course = courses[i];
                const number = course.number;
                //console.log("course number");
                //console.log(number)
                if (number < min) {
                    min = number;
                }
                if (number > max) {
                    max = number;
                }
            }
            const minDigit = parseInt(min.toString()[0]);
            const maxDigit = parseInt(max.toString()[0]);
            // console.log("digits");
            // console.log(minDigit);
            // console.log(maxDigit);
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
router.route("/professor").get((req, res) => {
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
    res.status(200).json({ message: 'cleared' })
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
    res.status(200).json({ message: 'fixed' })
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
    res.status(200).json({ message: 'added' })
})


// add the total score and review count when importing courses --------------------
router.route('/avgRating').post(async (req, res) => {
    console.log("HERE");
    const status = await Course.updateMany(
        {
            $set: {
                avgRating: -1,
            }
        }
    );
    res.status(200).json({ message: 'added' })
})
// update the ratings the total score and review count when importing courses --------------------
router.route('/updateAvgRating').post(async (req, res) => {
    console.log("HERE");
    //get the objects
    const cObj = await Course.find({
        reviewcount: {$gt: 0},
        avgRating: -1
    })
    console.log("this is course");
    //console.log(cObj);
    cObj.forEach(async course => {
        //update the rating
        course.avgRating = (course.totalscore / course.reviewcount).toFixed(2);
        console.log(course);
        await course.save();
        // do something with each course object
    });     
    res.status(200).json({ message: 'added' })
})


// Get all the reviews for a course --------------------
router.route("/getReviews").post(async (req, res) => {
    const id = req.body.id;
    const course = await Course.findOne({ _id: id })
        .catch(err => res.status(400).json("Error: " + err));

    if (course) {
        // console.log("this is the course");
        // console.log(course);
        // let reviewList = [];
        // //console.log("course review length " + course.reviews.length);
        // for (let i = 0; i < course.reviews.length; i++) {
        //     let id = course.reviews[i];
        //     // have to have _id, or else it will search friends list too
        //     let review = await Review.findOne({ _id: id }).lean();
        //     if (review) {
        //         reviewList.push({
        //             text: review.text,
        //             stars: review.stars,
        //             user: review.user,
        //             course: review.course,
        //             _id: review._id
        //         });
        //     }
        // }

        let reviewList = await Review.find({ course: id }).sort({ stars: -1 }).lean();

        res.status(200).json(reviewList);
    }
    else {
        res.status(401).json({ message: "ID does not exist" });
    }
})

module.exports = router;