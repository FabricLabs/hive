var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Source = {
  attributes: {
    created: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true },
    id: { type: String, required: true },
    flags: {
      restricted: { type: Boolean },
      broken: { type: Boolean }
    },
    times: {
      start: { type: Number , default: 0 },
      end: { type: Number , default: -1 },
    }
  },
  indices: [ { fields: ['type', 'id'] , unique: true } ]
}

module.exports = Source;
