const router = require('express').Router();
let Event = require('../models/Event');
const User = require('../models/User');

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
  const event = await Event.findOne({ id }).exec();

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
  //const title = req.body.title;
  const title = "testing if this works";
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
  /*
    So I should be able to look it up using a unique event id
      1. when a user clicks on an existing event, the object id is sent to the backend
      2. the backend sends the rest of the data to the frontend
      3. when the user finishes modifying the event, it should send the event with the rest of the rest of the data to the backend
      4. the backend update the database accordingly
  */

  //check what this returns when the object is not updated
  //(what if someone else deleted the event when a user was in the modify event page)

  //check if the event exists
  //if it does then update it
  //const event = await Event.findOne({ id }).lean();
  //res.status(200).json({ message: `Event, ${event.title}, was EDITTED` })
  

  //if (event) {
    // can i call it on the object itself? 
    /*
      const result = Event.updateOne(
        { _id:id },
        {
          title: title,
          startTime: startTime, 
          endTime: endTime, 
          location: location, 
          //users: users,
          note: note,
          //repeating: repeating,
          //type: type,
          //days: days
        }
      );
    */

  const event = await Event.findOne({ id }).lean();
  if (event) {
    event.title = title; // modify the title property of the event object
  
    const result = await Event.updateOne({ id }, { $set: { title: event.title } });
    res.status(200).json({ message: `Event, ediited`});
    console.log(result); // output the result of the update operation
  }
  

  
});


module.exports = router;
