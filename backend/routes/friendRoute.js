const router = require("express").Router();
let User = require("../models/User");

// return friends list from response user email
router.route("/").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password -seq1 -seq2 -seq3").lean();
    
    // RETURN LIST OF FRIENDS NAMES INSTEAD OF IDS:
    // let friendsNames = []
    // for (let i = 0; i < user.friends.length; i++) {
    //     const u = await User.findOne({ "_id": user.friends[i]});
    //     friendsNames.push(u.name);
    // }

    return res.status(200).json({ friendsList: user.friends});
    // return res.status(200).json({ friendsList: friendsNames});
});


// add friend to current user email
router.route("/add").post(async (req, res) => {
    const email = req.body.email;
    const friendId = req.body.friendId;

    // cannot use lean here because we need to save it
    const user = await User.findOne({ email });
    user.friends.push(friendId);
    user.save()
        .then(() => res.status(201).json("Friend added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search").post(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("_id name email status publicity")
        .catch(err => res.status(400).json("Error: " + err));
    
    if (user === null) {
        return res.status(400).json("User not found");
    }
    return res.status(200).json({ user: user})
});

module.exports = router;