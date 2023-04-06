const router = require("express").Router();
let User = require("../models/User");
let Chat = require("../models/Chat");
let Message = require("../models/Message");
const mongoose = require('mongoose');

// Get all messages, ONLY FOR POSTMAN --------------------------------
router.route("/").get((req, res) => {
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/send").post(async (req, res) => {
    const sender = req.body.sender;
    const chatId = req.body.chatId;
    const text = req.body.text;

    const senderUser = await User.findOne({email: sender});
    const chat = await Chat.findById(chatId);

    // create new message
    const newMessage = new Message({
        "text": text,
        "sender": senderUser._id,
    });

    newMessage.save();
    chat.messages.push(newMessage._id);
    chat.save()
        .then(() => res.status(201).json("Message sent!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;