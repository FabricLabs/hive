var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Play = {
  attributes: {
    title: { type: String },
    duration: { type: Number },
    _track: { type: ObjectId, ref: 'Track', required: true }
  }
}

module.exports = Play;
