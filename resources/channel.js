var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Channel = {
  attributes: {
    name: { type: String , max: 200 , required: true , slug: true },
    description: { type: String },
    _category: { type: ObjectId , ref: 'Category', populate: ['get', 'query'] },
    created: { type: Date , required: true , default: Date.now },
    _creator: { type: ObjectId , ref: 'Person' },
    _owner: { type: ObjectId , ref: 'Person' },
    _track: { type: ObjectId , ref: 'Track' , populate: ['get', 'query'] },
    _play: { type: ObjectId , ref: 'Play', populate: ['get', 'query'] }
  }
}

module.exports = Channel;
