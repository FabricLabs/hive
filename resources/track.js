var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Track = {
  attributes: {
    title: { type: String },
    duration: { type: Number }
  }
}

module.exports = Track;
