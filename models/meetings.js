const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    people: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
