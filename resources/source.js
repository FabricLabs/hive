var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Source = {
  attributes: {
    created: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true },
    id: { type: String, required: true }
  }
}

module.exports = Source;
