const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
//const Review = require('../models/Review');
const Note = require('../models/Note');
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
router.route("/single/:_id").get(async (req, res) => {
    Note.findOne({_id: req.params._id}).lean()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

// Add a personal note --------------------------------
router.route('/add').post(async (req, res) => {
    const text = req.body.text;
    const user = req.body.user;
    const course = req.body.course;

    console.log(text);
    console.log(user);
    console.log(course);
    console.log("this is the course type:")
    console.log(typeof course);

    //get the user object
    const userObj = await User.findById(user);
    //loop through the notes and see if one of them already has the same course
    let hasNote = false;
    let n;
    console.log(userObj.personalNotes);
    const courseID = new ObjectId(course);
    //console.log(typeof courseID);
    //console.log(course);
    //console.log(courseID);
    for (let i = 0; i < userObj.personalNotes.length; i++) {
        n = await Note.findById(userObj.personalNotes[i]);
        //if the note has already been made for the course
        if (n.course.equals(course)) {
            hasNote = true;
            i = userObj.personalNotes.length;
        }
    }
    if (hasNote) {
        return res.status(200).json({message: "hasNote"});
    } else {
            //create the new review
        const newNote = new Note({
            "text": text,
            "user": user,
            "course": course
        });
        await newNote.save()
            .catch(err => res.status(400).json("Error: " + err));

        //add the note id to the user
        if (!userObj) {
            //user doesn't exist
            console.log("user doesn't exist????");
        }
        userObj.personalNotes.push(newNote._id);
        await userObj.save()
            .catch(err => res.status(400).json({message: 'Error: ' + err}));
        
        return res.status(200).json({message: "Note added!"});

    }
});

// Delete a personal note --------------------------------
router.route('/delete').post(async (req, res) => {
    const id = req.body._id;
    const note = await Note.findOne({_id: id}).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found"});
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

    res.status(200).json({ message: `Note was deleted successfully` })

});

// Edit a personal note --------------------------------
router.route('/edit').post(async (req, res) => {
    const text = req.body.text;
    const noteID = req.body.noteID;
    const course = req.body.course;
    //update the reviewObj 
    console.log(noteID);
    const note = await Note.findOne({_id: noteID}).exec();
    //update the review
    console.log(note);
    note.text = text;
    note.course = course;

    //save the review obj
    note.save()
        .catch(err => res.status(400).json({message: 'ReviewObj Edit Review Error: ' + err}));

    return res.status(200).json("Note successfully editted!");
});

module.exports = router;