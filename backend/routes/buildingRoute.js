const router = require("express").Router();
let Building = require("../models/Building");

// GET
router.route("/").get((req, res) => {
    Building.find()
    .then(building => res.json(building))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST
router.route("/add").post(async (req, res) => {
    const virtual = req.body.virtual;
    const abbrev = req.body.abbrev;
    const name = req.body.name;
    const openTime = req.body.openTime;
    const closeTime = req.body.closeTime;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    // check if fields are populated
    if (!name || !virtual || !abbrev || !openTime || !closeTime || !longitude || !latitude) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const Building = new Building({
        "virtual": virtual,
        "abbrev": abbrev,
        "name": name,
        "openTime": openTime,
        "closeTime": closeTime,
        "longitude": longitude,
        "latitude": latitude
    });

    newUser.save()
        .then(() => res.status(201).json("Building added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;