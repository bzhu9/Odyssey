const router = require('express').Router();
let Record = require('../models/record.model');

router.route('/').get((req, res) => {
    Record.find()
    .then(records => res.json(records))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const note = req.body.note;

  const newRecord = new Record({username, note});

  newRecord.save()
    .then(() => res.json('Record added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
