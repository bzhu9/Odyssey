const router = require("express").Router();
let OpenClass = require("../models/OpenClass");

// GET
router.route("/").get((req, res) => {
    // // res.send("hi")
    // // OpenClass.find({building: req.body.building}, {startTime: req.body.startTime}, {endTime: req.endTime}, {room: req.body.room}, (err, rooms) => {
    // //     if (err) return handleError(err);
    // //     res.send(rooms)
    // // })
    // // somehow find all the times that match
    // // OpenClass.find()
    // OpenClass.find({
    //     // startTime: { $lt: req.body.startTime},
    //     // endTime: {$gt: req.body.endTime},
    //     building: req.body.building
    // })
    // .then(room => res.json(room))
    // .catch(err => res.status(400).json("Error: " + err));
    // // OpenClass.aggregate([
    // //     { $unwind: "$OpenClass" },
    // //     { $project: { }}
    // // ])
    // // res.send('looking')
    point
    OpenClass.findOne({building: req.body.building}, {geoPoint : 1})
    .then(doc => point = doc.geoPoint)
    .catch(err => res.status(400).json("Error: " + err));

    OpenClass.find({
        endTime: {$gt: req.body.endTime},
        startTime: {$lt: req.body.startTime},
        location: {
            $near: {
                $geometry: point
            }
        }
    })
    .then(room => res.json(room))
    .catch(err => rest.status(400).json("error: " + err));
});

router.route("/").post((req, res) => {
    OpenClass.find({
        startTime: { $lt: req.body.startTime},
        endTime: {$gt: req.body.endTime},
        building: req.body.building
    })
    .then(room => res.json(room))
    .catch(err => res.status(400).json("Error: " + err));

    // OpenClass.find({
    //     endTime: {$gt: req.body.endTime},
    //     startTime: {$lt: req.body.startTime},
    //     location: {
    //         $near: {
    //             $geometry: point
    //         }
    //     }
    // })
    // .then(room => res.json(room))
    // .catch(err => rest.status(400).json("error: " + err));
});

router.route("/all").get((req, res) => {
    OpenClass.find()
    .then(room => res.json(room))
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/add').post((req, res) => {
    const startTime = req.body.startTime
    const endTime = req.body.endTime;
    const building = req.body.building;
    const room = req.body.room

    const newOpenClass = new OpenClass({
        "startTime": startTime,
        "endTime": endTime,
        "building": building,
        "room": room,
    });

    newOpenClass.save()
        .then(() => res.json('Saved!'))
        .catch(err => res.status(400).json('Error: ' + err))
});


router.route('/clear').post(async (req,res) => {
    const status = await OpenClass.deleteMany({});
    res.status(200).json({message: 'cleared'})
})

router.route('/addGeo').post(async (req, res) => {
    OpenClass.updateMany({}, [
        {
            $set: {
                geoPoint: {
                    type: "Point",
                    coordinates: [
                        "$long",
                        "$lat"
                    ]
                }
            }
        }
    ], (err, result) => {
        if (err) throw err;
        console.log(`${result.modifiedCount} documents updated.`);
    });
    res.status(200).json({message: 'added geo'})
})
module.exports = router;