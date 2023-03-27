const router = require('express').Router();
let Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Event.find()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get a single event
router.route('/single/:_id').get(async (req, res) => {
  Event.findOne({ _id: req.params._id }).lean()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

//const event = await Event.findOne({ _id: id }).lean();

router.route('/add').post((req, res) => {
  //console.log("3");
  const title = req.body.title;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;

  //const req_users = req.body.req_users;
  const users = req.body.users;
  const req_users = req.body.req_users;
  const note = req.body.note;
  // const repeating = req.body.repeating;
  // const type = req.body.type;
  // const days = req.body.days;

  //check if the fields are populated
  // if (!startTime || !endTime || !location || !users || !note || !repeating || !type || !days) {
  if (!title || !startTime || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }


  //create the new event
  const newEvent = new Event({
    "title": title,
    "startTime": startTime,
    "endTime": endTime,
    "location": location,
    "users": users,
    "req_users": req_users,
    "note": note,
    // "repeating": repeating,
    // "type": type,
    // "days": days
  });

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete').post(async (req, res) => {
  /*
      after deletion make sure that the events is updated
      so every time that the user moves to a calendar view,
        the event list should refresh.
      the user should get an error if they delete an event
      that doesn't exist
  */
  //get the id
  const id = req.body._id;
  //find the object in the database
  const event = await Event.findOne({ _id: id }).exec();

    if (!event) {
        return res.status(400).json({ message: "Event not found"});
    }
    //delete the event object
    //does this work or do i need to call the class
    const result = await event.deleteOne();

    res.status(200).json({ message: `Event, ${result.title}, was deleted successfully` })

});

//modify an already existing event
router.route('/edit').post(async (req, res) => {
  //get the information
  const id = req.body._id;
  const title = req.body.title;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;
  //const users = req.body.users;
  const note = req.body.note;
  //const repeating = req.body.repeating;
  //const type = req.body.type;
  //const days = req.body.days;

  if (!title || !startTime || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }
  /*
  //check if the fields are populated
  if (!title || !startTime || !endTime || !location || !users || !note || !repeating || !type || !days) {
    return res.status(400).json({ message: "All fields are required" });
  }
  */

  const event = await Event.findOne({ _id: id }).lean();
  if (!event) {
    res.status(401).json({ message: "No Event" });
  }
  if (event) {
    //event.title = req.body.title; // modify the title property of the event object
    //event.startTime = req.body.startTime;
    //event.endTime = req.body.endTime;
    //event.location = req.body.location;
    //const users = req.body.users;
    //event.note = req.body.note;
    //const repeating = req.body.repeating;
    //const type = req.body.type;
    //const days = req.body.days;
    const result = await Event.updateOne({ _id: id }, { $set: {
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      //users: req.body.users,
      note: req.body.note,
      //repeating: req.body.repeating,
      //type: req.body.type,
      //days: req.body.days 
    } });
    res.status(200).json({ message: `Event successfully edited!`});
    console.log(result); // output the result of the update operation
  }
  

  
});


module.exports = router;
