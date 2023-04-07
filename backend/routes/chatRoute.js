const router = require("express").Router();
let User = require("../models/User");
let Chat = require("../models/Chat");
let Message = require("../models/Message");
const mongoose = require('mongoose');
const { raw } = require("express");

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

router.route("/addUser").post(async (req, res) => {
    const userEmail = req.body.userEmail;
    const chatId = req.body.chatId;
    const user = await User.findOne({ email: userEmail}).lean();
    const chat = await Chat.findById(chatId);

    if (chat.users.includes(user._id)) {
        return res.status(400).json("This user is already in the chat!");
    }

    chat.users.push(user._id);
    chat.save()
    .then(() => res.status(201).json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
})


router.route("/loadMessages").post(async (req, res) => {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    const rawMessages = chat.messages;
    const processedMessages = [];
    for (let i = 0; i < rawMessages.length; i++) {
        const m = await Message.findById(rawMessages[i]);
        const user = await User.findById(m.sender);
        processedMessages.push({
            sender: {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            text: m.text,
            createdAt: m.createdAt
        });
    }
    return res.status(200).json({messages: processedMessages });
})

router.route("/getUsers").post(async (req, res) => {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    const rawUsers = chat.users;
    const processedUsers = [];
    for (let i = 0; i < rawUsers.length; i++) {
        const u = await User.findById(rawUsers[i]);
        processedUsers.push({
            name: u.name,
            email: u.email,
            _id: u._id
        });
    }
    return res.status(200).json({users: processedUsers });
})
module.exports = router;