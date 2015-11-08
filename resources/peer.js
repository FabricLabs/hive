var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Peer = {
  attributes: {
    protocol: { type: String , enum: ['ipv4', 'ipv6', 'dns'], default: 'ipv4' },
    address: { type: String },
    port: { type: String },
    _keys: [ { type: ObjectId , ref: 'Key' } ]
  }
}

module.exports = Peer;
