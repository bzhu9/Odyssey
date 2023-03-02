const router = require('express').Router();
let Event = require('../models/Event');

router.route('/').get((req, res) => {
    Event.find()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;
  // const users = req.body.users;
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
    // "users": users,
    "note": note,
    // "repeating": repeating,
    // "type": type,
    // "days": days
  });

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
