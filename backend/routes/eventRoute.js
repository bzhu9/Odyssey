const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

router.route('/').get((req, res) => {
    Event.find()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getUsersEvents").post(async (req, res) => {
  const userEmail = req.body.userEmail;
  const owner = await User.findOne({ email: userEmail })
    .catch(err => res.status(400).json({message: 'Error: ' + err}));
  let events = []
  for (let i = 0; i < owner.events.length; i++) {
    events.push(await Event.findOne({ _id: owner.events[i]}).catch(err => res.status(400).json({message: 'Error: ' + err})));
  }
  return res.status(200).json(events);
})

//get a single event
router.route('/single/:_id').get(async (req, res) => {
  Event.findOne({ _id: req.params._id }).lean()
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

//const event = await Event.findOne({ _id: id }).lean();

router.route('/add').post(async (req, res) => {
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
    .catch(err => res.status(400).json({message: 'Error: ' + err}));
    
  let owner = await User.findById(users[0])
    .catch(err => res.status(400).json({message: 'Error: ' + err}));

  owner.events.push(newEvent._id);
  owner.save()
    //.then(() => res.json('Event added!'))
    .catch(err => res.status(400).json({message: 'Error: ' + err}));
  for (let i = 0; i < req_users.length; i++) {
    let reqUserID = req_users[i];
    let reqUser = await User.findById(reqUserID);
    reqUser.req_events.push(newEvent._id);
    console.log("here 1");
    reqUser.save()
      .catch(err => res.status(400).json({message: 'ReqInv Error: ' + err}));
  }

  //send the res message
  return res.status(200).json("Event added!");
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

    //go through and delete all the users from the event

    let userList = event.users;
    


    for (let i = 0; i < userList.length; i++) {
      const user = await User.findOne({_id: userList[i]});
      if (!user) {
        console.log("wtf user not found");
      } else {
        console.log("user exists");
        if( user.events.includes(event._id)) {
          user.events.splice(user.events.indexOf(event._id),1);
          user.save()
            .catch(err => res.status(400).json({message: 'User Delete Event Error: ' + err}));
        }
      }

    }


    //go through and delete all the req_users from the event
    let reqList = event.req_users;
    

    for (let i = 0; i < reqList.length; i++) {
      const reqUser = await User.findOne({_id: reqList[i]});
      if (!reqUser) {
        console.log("wtf req_user not found");
      } else {
        console.log("req_user exists");
        if( reqUser.req_events.includes(event._id)) {
          reqUser.req_events.splice(reqUser.req_events.indexOf(event._id),1);
          reqUser.save()
            .catch(err => res.status(400).json({message: 'Req Delete Event Error: ' + err}));
        }
      }

    }
    const result = await event.deleteOne();

    res.status(200).json({ message: `Event, ${result.title}, was deleted successfully` })
    //res.status(200).json({ message: `Event, was deleted successfully` })

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

    //go through users requested, and make sure they are not users in the event
    //console.log(req.body.req_users);
    const req_users_list = req.body.req_users;
    //const req_users_list = list.map((id) => new ObjectId(id));
   // console.log(req_users_list);
   // console.log("here1");
   // console.log(req_users_list);
    const userList = event.users.map((objectId) => objectId.toString());
   // console.log(userList);
    if (req_users_list) {
      for (let i = 0; i < req_users_list.length; i++) {
        //console.log("here2");
        console.log(userList.includes(req_users_list[i]));
        if (userList.includes(req_users_list[i])) {
          //console.log("user alr accepted");
          req_users_list.splice(i, 1);
          i--;
        }
    }
   }
    
    //console.log("here4");


    const result = await Event.updateOne({ _id: id }, { $set: {
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      req_users: req_users_list,
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


router.route("/acceptEventRequest").post(async (req, res) => {
  const email = req.body.email;
  const eventID = req.body.id;
  //get the user
    //add it to the event list
    //remove it from the req list
  const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
      .catch(err => res.status(400).json("Error: " + err));
  
  const event = await Event.findOne({_id: eventID})
      .catch(err => res.status(400).json("Error: " + err));

  //console.log(event);
  
  //convert objects into strings and then find and remove
  user.req_events.splice(user.req_events.indexOf(event._id), 1)
  //adding event to User object
  user.events.push(event._id);

  //get the event ID
    //remove it from the req list
  event.req_users.splice(event.req_users.indexOf(user._id), 1);
    // add it to the user list
  event.users.push(user._id);

  //save the user and event
  user.save()
      .catch(err => res.status(400).json({message: 'accept invite user Error: ' + err}));
  event.save()
      .catch(err => res.status(400).json({message: 'accept invite event Error: ' + err}));

  return res.status(200).json({ message: `Event: ${event.title} sucessfully accepted`});
});

router.route("/deleteEventRequest").post(async (req, res) => {
  const email = req.body.email;
  const eventID = req.body.id;

  //delete it from req_user in event
  //delete it from req_event in user

  //get the user
  const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
      .catch(err => res.status(400).json("Error: " + err));
  //get event
  const event = await Event.findOne({_id: eventID})
      .catch(err => res.status(400).json("Error: " + err));
  
  //remove from req_event in user object
  console.log(user.req_events);
  user.req_events.splice(user.req_events.indexOf(event._id), 1)
  console.log(user.req_events);

  console.log("============");
  
  //remove it from the req user list in event object
  console.log(event.req_users);
  event.req_users.splice(event.req_users.indexOf(user._id), 1);
  console.log(event.req_users);


  //save the user and event
  /*
  user.save()
      .catch(err => res.status(400).json({message: 'accept invite user Error: ' + err}));
  event.save()
      .catch(err => res.status(400).json({message: 'accept invite event Error: ' + err}));

  */

  return res.status(200).json({ message: `Event: ${event.title} deleted!`});
});



module.exports = router;