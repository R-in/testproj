const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  employe: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('job', JobSchema);
//module.exports = job