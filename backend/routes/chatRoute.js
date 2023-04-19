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
    let userList = [];
    for (let i = 0; i < users.length; i++) {
        const u = await User.findOne({email: users[i]});
        userList.push(u);
        userIds.push(u._id);
    }

    const newChat = new Chat({
        "messages": [],
        "users": userIds,
        "isGroup": isGroup
    });

    for (let i = 0; i < userList.length; i++) {
        let u = userList[i];

        u.chats.push(newChat._id);
        u.save();
    }

    newChat.save()
        .then(() => res.status(201).json({message: "Chat created!", chatId: newChat._id }))
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
    const chat = await Chat.findById(chatId).lean();
    const rawMessages = chat.messages;
    const processedMessages = [];
    for (let i = 0; i < rawMessages.length; i++) {
        const m = await Message.findById(rawMessages[i]).lean();
        const user = await User.findById(m.sender).lean();
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

router.route("/leaveGroup").post(async (req, res) => {
    const email = req.body.user;
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    const user = await User.findOne({ email: email });

    let ind = chat.users.indexOf(user._id);
    if (ind > -1) {
        chat.users.splice(ind, 1);
    }
    ind = user.chats.indexOf(chat._id);
    if (ind > -1) {
        user.chats.splice(ind, 1);
    }
    chat.save();
    user.save()
    .then(() => res.status(201).json("Left group!"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;