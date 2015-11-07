var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Play = {
  attributes: {
    title: { type: String },
    duration: { type: Number }
  }
}

module.exports = Play;
