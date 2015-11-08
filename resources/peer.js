var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Peer = {
  attributes: {
    address: { type: String },
    port: { type: String },
    _keys: [ { type: ObjectId , ref: 'Key' } ]
  }
}

module.exports = Peer;
