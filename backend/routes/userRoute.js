const router = require("express").Router();
let User = require("../models/User");
let Event = require("../models/Event");
let Course = require("../models/Course");
let Chat = require("../models/Chat");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

// Get all users --------------------------------
router.route("/").get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// Get only the ID of a user ----------------------------------
router.route("/getID").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("_id").lean();
    const id = user._id;

    // if(mongoose.Types.ObjectId.isValid(id)) {
    //     console.log("id is TRUE");
    // } else {
    //     console.log("id is false");
    // }
    return res.status(200).json({ id });
});

// Get one user ----------------------------------
router.route("/").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3").lean();
    if (!user) {
        return res.status(400).json("User not found");
    }

    return res.status(200).json({ user: user });
});

// Get one user using objectID --------------------
router.route("/getWithID").post(async (req, res) => {
    const id = req.body.id;
    const user = await User.findOne({ _id: id }).select("-password -seq1 -seq2 -seq3").lean();
    return res.status(200).json({ user: user });
});

// POST to Register User
router.route("/add").post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const seq1 = req.body.seq1;
    const seq2 = req.body.seq2;
    const seq3 = req.body.seq3;
    const securityA = req.body.securityA;

    // check if fields are populated
    if (!name || !email || !password || !seq1 || !seq2 || !seq3) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // regex to check if only characters
    if (!(/^[a-zA-Z ,.'-]+$/.test(name))) {
        return res.status(409).json({ message: "Name must consist of only letters"});
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email found"});
    }

    // check for valid emails
    if (!(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email))) {
        return res.status(409).json({ message: "Please enter a valid email"});
    }

    // hash password, 10 salt rounds
    const hashedPassword  = await bcrypt.hash(password, 10)

    const newUser = new User({
        "name": name,
        "email": email,
        "password": hashedPassword,
        "seq1": seq1,
        "seq2": seq2,
        "seq3": seq3,
    });

    newUser.save()
        .then(() => res.status(201).json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

// LOGIN USER ------------------------------------
router.route("/login").post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).lean();
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            res.status(200).json({ message: "User logged in successfully", user: user.email });
        }
        else {
            // res.status(401).send({message: "Wrong password"});
            res.status(401).json({ message: "Wrong password" });
        }
    }
    else {
        // Email doesn't exist
        // res.send("Email does not exist");
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Reset password -----------------------------------
router.route("/reset").post(async (req, res) => {
    const email = req.body.email;
    const seq1 = req.body.seq1;
    const seq2 = req.body.seq2;
    const seq3 = req.body.seq3; 
    const newPassword = req.body.password;
    const user = await User.findOne({ email }).lean();
    if (user) {
        //compare the security Q
        //const match = await bcrypt.compare(password, user.password)
        if ((seq1 === user.seq1) && (seq2 === user.seq2) && (seq3 === user.seq3)) {
            //update the password
            const hashedPassword  = await bcrypt.hash(newPassword, 10)
            //not sure if this is correct
            await User.findOneAndUpdate({ email }, { password: hashedPassword }).lean();
            //send response
            res.status(200).json({ message: "Password Successfully Reset", user: user.email });
        }
        else {
            //security answer is incorrect
            res.status(401).json({ message: "Wrong Security Question Answer" });
        }
    }
    else {
        // Email doesn't exist
        res.status(401).json({ message: "Email does not exist" });
    }
});

// need frontend delete button only if user is signed in

// Delete user -----------------------------------
router.route("/delete").post(async (req, res) => {
    const email = req.body.email;
    //const password = req.body.password;
    //const seq = req.body.seq;
    // console.log(req.body);
    // console.log(email);
    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found"});
    }
    //const match = await bcrypt.compare(password, user.password);
    //if (match && user.seq1 === seq) {
        const result = await user.deleteOne();
        res.status(200).json({ message: `User with email ${result.email} was deleted successfully` })
    //}
    //else {
    //    res.status(401).json({ message: "Credentials do not match"});
    //}
})

// Reset email --------------------------------------------
router.route("/email").post(async (req, res) => {
    const oldEmail = req.body.oldEmail;
    const newEmail = req.body.newEmail;
    const duplicate = await User.findOne({ email: newEmail }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email found"});
    }
    const user = await User.findOne({ email: oldEmail }).lean();

    if (user) {
        await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail }).lean();
        //send response
        res.status(200).json({ message: "Email Successfully changed", user: user.email });
    }
    else {
        // Email doesn't exist
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Get user objects from friends list ---------------
router.route("/getFriends").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password -seq1 -seq2 -seq3").lean();

    if (user) {
        let friendList = [];
        for (let i = 0; i < user.friends.length; i++) {
            let id = user.friends[i];
            // have to have _id, or else it will search friends list too
            let friend = await User.findOne({ _id: id }).select("-password -seq1 -seq2 -seq3").lean();
            if (friend) {
                friendList.push({
                    id: friend._id,
                    name: friend.name,
                    email: friend.email,
                    status: friend.status,
                    privacy: friend.privacy
                });
            }
        }
        res.status(200).json(friendList);
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Get user objects from friend requests list ---------------
router.route("/getFriendRequests").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password -seq1 -seq2 -seq3").lean();

    if (user) {
        let friendReqList = [];
        for (let i = 0; i < user.friend_reqs.length; i++) {
            let id = user.friend_reqs[i];
            // have to have _id, or else it will search friends list too
            let friend = await User.findOne({ _id: id }).select("-password -seq1 -seq2 -seq3").lean();
            if (friend) {
                friendReqList.push({
                    name: friend.name,
                    email: friend.email,
                    status: friend.status,
                    privacy: friend.privacy
                });
            }
        }
        res.status(200).json(friendReqList);
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Get user's event requests from list -------------
router.route("/getEventRequests").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password -seq1 -seq2 -seq3").lean();

    if (user) {
        let eventReqList = [];
        for (let i = 0; i < user.req_events.length; i++) {
            let id = user.req_events[i];
            // have to have _id, or else it will search friends list too
            let event = await Event.findOne({ _id: id }).lean();
            //let event = await api.getSingleEvent(id);
            if (event) {
                // parse it so that it is 
                // Name of event
                // Day
                // Start time - end time

                let startDate = event.startTime;
                const startTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const endDate = event.endTime;
                const endTime = endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                const date = startDate.toLocaleString('en-us', { month: 'short', day: '2-digit', year: 'numeric' });
                //console.log(date);
                const [month, day, year] = date.split(' ');
                const startDay = `${month} ${day} ${year}`;

                //parse into hr:minute

                eventReqList.push({
                    id: event._id,
                    title: event.title,
                    day: startDay,
                    startTime: startTime,
                    endTime: endTime
                });
            }
        }
        res.status(200).json(eventReqList);
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});




// Get user's privacy ---------------
router.route("/getPrivacy").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("privacy").lean();

    if (user) {
        res.status(200).json({privacy: user.privacy});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Set user's privacy ---------------
router.route("/setPrivacy").post(async (req, res) => {
    const email = req.body.email;
    const priv = req.body.priv;
    const user = await User.findOne({ email: email }).select("privacy").lean();

    if (user) {
        await User.findOneAndUpdate({ email }, { privacy: priv }).lean();
        res.status(200).json({privacy: priv});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});


// Get user's status ---------------
router.route("/getStatus").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("status").lean();

    if (user) {
        res.status(200).json({status: user.status});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});

// Set user's status ---------------
router.route("/setStatus").post(async (req, res) => {
    const email = req.body.email;
    const status = req.body.status;
    const user = await User.findOne({ email: email }).select("status").lean();

    if (user) {
        await User.findOneAndUpdate({ email }, { status: status }).lean();
        res.status(200).json({status: status});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});

router.route("/setWorkday").post(async (req, res) => {
    const email = req.body.email;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const user = await User.findOne({ email: email }).select("workdayStart workdayEnd").lean();

    if (user) {
        await User.findOneAndUpdate({ email: email }, { workdayStart: startTime, workdayEnd: endTime }).lean();
        res.status(200).json({message: "Success"});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
})
router.route("/getWorkday").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("workdayStart workdayEnd").lean();

    if (user) {
        res.status(200).json({workdayStart: user.workdayStart, workdayEnd: user.workdayEnd});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});




router.route("/setCourses").post(async (req, res) => {
    const email = req.body.email;
    const courseNames = req.body.courseNames;

    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3");

    let tempCourses = [];
    for (let i = 0; i < courseNames.length; i++) {
        const course = await Course.findOne({ name: courseNames[i]});
        tempCourses.push(course._id);
    }

    user.courses = tempCourses;
    user.save()
    .then(() => res.status(201).json("Course added!"))
    .catch(err => res.status(400).json("Error: " + err));
    // course.save();
    // .then(() => res.status(201).json("Course added!"))
    // .catch(err => res.status(400).json("Error: " + err));
})

router.route("/getCourses").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
    .catch(err => res.status(400).json("Error: " + err));
    
    if (user) {
        let courseList = [];
        for (let i = 0; i < user.courses.length; i++) {
            let id = user.courses[i];
            // have to have _id, or else it will search friends list too
            let course = await Course.findOne({ _id: id }).lean();
            if (course) {
                courseList.push({
                    name: course.name,
                    _id: course._id
                });
            }
        }
        res.status(200).json(courseList);
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
})

// router.route("/getChats").post(async (req, res) => {
//     const email = req.body.email;
//     // const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
//     //     .catch(err => res.status(400).json("Error: " + err));
//     // if (user) {
//     //     let chats = [];
//     //     for (let i = 0; i < user.chats.length; i++) {
//     //         let chatId = user.chats[i];
//     //         let chat = await Chat.findOne({ _id: chatId}).lean();
//     //         if (chat) {
//     //             let userList = []
//     //             for (let j = 0; j < chat.users.length; j++) {
//     //                 if (!user._id.equals(chat.users[j])) {
//     //                     userList.push(await User.findById(chat.users[j]));
//     //                 }
//     //             }
//     //             chats.push({
//     //                 createdAt: chat.createdAt,
//     //                 updatedAt: chat.updatedAt,
//     //                 isGroup: chat.isGroup,
//     //                 users: userList,
//     //                 messages: chat.messages,
//     //                 _id: chat._id
//     //             });
//     //         }
//     //     }
//     //     res.status(200).json({chats: chats});
//     // }
//     const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
//         .catch(err => res.status(400).json("Error: " + err));
//     if (user) {
//         const chats = await Chat.find({ _id: { $in: user.chats }})
//             .populate({
//                 path: "users",
//                 select: "-password -seq1 -seq2 -seq3"
//             })
//             .lean()
//             .exec();
//         const chatList = chats.map(chat => ({
//             createdAt: chat.createdAt,
//             updatedAt: chat.updatedAt,
//             isGroup: chat.isGroup,
//             users: chat.users.filter(u => !user._id.equals(u._id)),
//             messages: chat.messages,
//             _id: chat._id
//         }));
//         res.status(200).json({chats: chatList});
//     }
//     else {
//         res.status(401).json({ message: "Email does not exist" });
//     }

// })

router.route("/getChats").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    if (user) {
        let chats = [];
        for (let i = 0; i < user.chats.length; i++) {
            let chatId = user.chats[i];
            let chat = await Chat.findOne({ _id: chatId})
                .populate({
                    path: "users",
                    select: "-password -seq1 -seq2 -seq3"
                })
                .lean()
                .exec();
            if (chat) {
                let userList = []
                for (let j = 0; j < chat.users.length; j++) {
                    if (!user._id.equals(chat.users[j]._id)) {
                        userList.push(chat.users[j]);
                    }
                }
                chats.push({
                    createdAt: chat.createdAt,
                    updatedAt: chat.updatedAt,
                    isGroup: chat.isGroup,
                    users: userList,
                    messages: chat.messages,
                    _id: chat._id
                });
            }
        }
        res.status(200).json({chats: chats});
    }
    else {
        res.status(401).json({ message: "Email does not exist" });
    }
});


module.exports = router;
