const router = require("express").Router();
let User = require("../models/User");
let Chat = require("../models/Chat");
let Message = require("../models/Message");
const mongoose = require('mongoose');

// Get all chats, ONLY FOR POSTMAN --------------------------------
router.route("/").get((req, res) => {
    Chat.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/create").post(async (req, res) => {
    const users = req.body.users;
    const isGroup = req.body.isGroup;

    let userIds = [];
    for (let i = 0; i < users.length; i++) {
        const u = await User.findOne({email: users[i]}).lean();
        userIds.push(u._id);
    }

    const newChat = new Chat({
        "messages": [],
        "users": userIds,
        "isGroup": isGroup
    });

    newChat.save()
        .then(() => res.status(201).json("Chat created!"))
        .catch(err => res.status(400).json("Error: " + err));

});

module.exports = router;