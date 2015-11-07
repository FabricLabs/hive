var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Source = {
  attributes: {
    type: { type: String, required: true },
    id: { type: String, required: true }
  }
}

module.exports = Source;
