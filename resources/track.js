var ObjectId = require('mongoose').SchemaTypes.ObjectId;
var Schema = require('mongoose').Schema;

var Track = {
  attributes: {
    created: { type: Date, required: true, default: Date.now },
    title: { type: String },
    duration: { type: Number , default: 15 },
    sources: { type: ObjectId , ref: 'Source', required: true }
  }
}

module.exports = Track;
