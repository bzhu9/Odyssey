const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
//const Review = require('../models/Review');
const Note = require('../models/PersonalNote');
const Course = require('../models/Course');
const User = require('../models/User');
// const { default: apis } = require('../../frontend/src/apis');

// Get all personal notes --------------------------------
router.route("/").get((req, res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});
// Get a signal note --------------------------------
router.route("/single").post((req, res) => {
    const noteID = req.body.noteID;
    Note.findOne({_id: noteID}).lean()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

// Add a personal note --------------------------------
router.route('/add').post(async (req, res) => {
    const text = req.body.text;
    const user = req.body.user;
    const course = req.body.course;

    //create the new review
    const newNote = new PersonalNote({
        "text": text,
        "user": user,
        "course": course,
        "stars": stars
    });
    newNote.save()
        .catch(err => res.status(400).json("Error: " + err));

    //add the note id to the user
    const userObj = await User.findById(user);
    if (!userObj) {
        //user doesn't exist
        console.log("user doesn't exist????");
    }
    userObj.personalNote.push(newNote._id);
    userObj.save()
        .catch(err => res.status(400).json({message: 'Error: ' + err}));
    
    
    return res.status(200).json("Personal Note added!");
});

// Delete a personal note --------------------------------
router.route('/delete').post(async (req, res) => {
    const id = req.body._id;
    const note = await Note.findOne({_id: id}).exec();

    if (!note) {
        return res.status(400).json({ message: "Personal Note not found"});
    }

    //get the user
    const user = await User.findOne({_id: note.user});
    if (!user) {
        return res.status(400).json({ message: "User not found"});
    }
    //delete the review from the user
    if (user.personalNotes.includes(note._id)) {
        user.personalNotes.splice(user.personalNotes.indexOf(note._id),1);
        user.save()
            .catch(err => res.status(400).json({message: 'User Delete Review Error: ' + err}));
    }
    //delete the review
    const result = await note.deleteOne();

    res.status(200).json({ message: `Personal Note was deleted successfully` })

});

// Edit a personal note --------------------------------
router.route('/edit').post(async (req, res) => {
    const text = req.body.text;
    const noteID = req.body.noteID;
    const course = req.body.course;
    //update the reviewObj 
    const noteObj = Note.findOne({_id: noteID}).exec();
    //update the review
    reviewObj.text = text;
    reviewObj.course = course;

    //save the review obj
    reviewObj.save()
        .catch(err => res.status(400).json({message: 'ReviewObj Edit Review Error: ' + err}));

    return res.status(200).json("Review successfully editted!");
});

module.exports = router;