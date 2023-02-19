const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  startTime: {
    //mongo will format it in its own way
    type: Date,
    require: true
  },
  endTime: {
    type: Date,
    require: true
  },
  location: {
    //have to create a schema for building
    type: String,
    require: true
  },
  users: {
    // list of _ids
    type: Schema.Types.ObjectId,
    //require: true,
  },
  note: {
    type: String,
    default: ""
  },
  repeating: {
    type: String,
    enum: ['weekly', 'monthly', 'none'],
    require: true
  },
  type: {
    type: String,
    enum: ['meal', 'study', 'class', 'misc'],
    require: true

  },
  days: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    require: true

  },
  
}
  
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
