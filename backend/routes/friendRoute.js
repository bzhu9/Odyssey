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
    
    if (!user) {
        return res.status(400).json("User not found");
    }
    return res.status(200).json({ user: user})
});

router.route("/sendFriendRequest").post(async (req, res) => {
    const email = req.body.email;
    const friend = req.body.friend;

    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    const userid = user._id;
    const friendObject = await User.findOne({ email: friend }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));

    if (!friendObject) {
        return res.status(400).json("User not found");
    }
    if (user.sent_reqs.includes(friendObject._id)) {
        return res.status(400).json("You have already sent a friend request to this user!");
    }

    if (user.friends.includes(friendObject._id)) {
        return res.status(400).json("This user is already your friend");
    }
    user.sent_reqs.push(friendObject._id);
    friendObject.friend_reqs.push(userid);
    friendObject.save();
    user.save()
        .then(() => res.status(201).json("Friend request sent!"))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route("/acceptFriendRequest").post(async (req, res) => {
    const email = req.body.email;
    const friendEmail = req.body.friendEmail;

    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    const friendObject = await User.findOne({ email: friendEmail }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    
    // add to friends list
    user.friends.push(friendObject._id);
    friendObject.friends.push(user._id);
    
    // remove from friends request list
    let index = user.friend_reqs.indexOf(friendObject._id);
    user.friend_reqs.splice(index, 1);
    user.save();
    index = friendObject.sent_reqs.indexOf(user._id);
    friendObject.sent_reqs.splice(index, 1);
    friendObject.save().then(() => res.status(201).json("Friend added!"))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route("/deleteFriendRequest").post(async (req, res) => {
    const email = req.body.email;
    const friendEmail = req.body.friendEmail;
    
    const user = await User.findOne({ email: email }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    const friendObject = await User.findOne({ email: friendEmail }).select("-password -seq1 -seq2 -seq3")
        .catch(err => res.status(400).json("Error: " + err));
    
    // remove from friends request list
    const index = user.friend_reqs.indexOf(friendObject._id);
    user.friend_reqs.splice(index, 1);
    index = friendObject.sent_reqs.indexOf(user._id);
    friendObject.sent_reqs.splice(index, 1);
    friendObject.save();
    user.save()
        .then(() => res.status(201).json("Friend added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;