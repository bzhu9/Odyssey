const router = require("express").Router();
let User = require("../models/User");
const bcrypt = require("bcrypt");

// GET
router.route("/").get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST
router.route("/add").post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const securityQ = req.body.securityQ;
    const securityA = req.body.securityA;

    // check if fields are populated
    if (!name || !email || !password || !securityQ || !securityA) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email"});
    }

    // hash password, 10 salt rounds
    const hashedPassword  = await bcrypt.hash(password, 10)

    // const status = req.body.status;

    // // optional chaining if they exist
    // const calendar = req.body?.calendar;
    // const friends = req.body?.friends;
    
    // const publicity = req.body.publicity;

    const newUser = new User({
        "name": name,
        "email": email,
        "password": hashedPassword,
        "securityQ": securityQ,
        "securityA": securityA,
    });

    newUser.save()
        .then(() => res.status(201).json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;