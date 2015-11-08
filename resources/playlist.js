var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Playlist = {
  attributes: {
    name: { type: String, max: 200, required: true, slug: true },
    _creator: { type: ObjectId , ref: 'Person' },
    _tracks: [ { type: ObjectId , ref: 'Track'} ]
  }
}

module.exports = Playlist;
