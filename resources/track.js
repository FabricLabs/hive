var ObjectId = require('mongoose').SchemaTypes.ObjectId;
var Schema = require('mongoose').Schema;

var Source = new Schema({
  _source: { type: ObjectId , ref: 'Source', required: true },
  created: { type: Date, required: true, default: Date.now },
});

var Track = {
  attributes: {
    created: { type: Date, required: true, default: Date.now },
    title: { type: String },
    duration: { type: Number },
    sources: [ Source ]
  }
}

module.exports = Track;
