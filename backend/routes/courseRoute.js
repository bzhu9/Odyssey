const router = require('express').Router();
let Course = require('../models/Course');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Get all courses --------------------------------
router.route("/").get((req, res) => {
    Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newCourse = new Course({
        "name": name
    });

    newCourse.save()
        .then(() => res.status(201).json("Course added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;