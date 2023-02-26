const router = require("express").Router();
let User = require("../models/User");
const bcrypt = require("bcrypt");

// GET
router.route("/").get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password -seq1 -seq2 -seq3").lean();

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

    // check for duplicate emails
    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email"});
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

router.route("/reset").post(async (req, res) => {
    const email = req.body.email;
    const security = req.body.seq1;
    const newPassword = req.body.password;
    const user = await User.findOne({ email }).lean();
    if (user) {
        //compare the security Q
        //const match = await bcrypt.compare(password, user.password)
        if (security === user.seq1) {
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

module.exports = router;