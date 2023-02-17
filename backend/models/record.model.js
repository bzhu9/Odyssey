const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  note: {
    type: String,
    require: true
  },
}
  // timestamps: true,
);

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
