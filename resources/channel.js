var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Channel = {
  attributes: {
    name: { type: String, max: 200, required: true, slug: true },
    created: { type: Date, required: true, default: Date.now },
    _creator: { type: ObjectId, ref: 'Person' },
    _owner: { type: ObjectId, ref: 'Person' },
  }
}

module.exports = Channel;
