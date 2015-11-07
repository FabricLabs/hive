var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Channel = {
  attributes: {
    name: { type: String, max: 200, required: true, slug: true }
  }
}

module.exports = Channel;
