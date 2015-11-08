var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Search = {
  attributes: {
    //created: { type: Date, required: true, default: Date.now },
    query: { type: String , required: true , max: 80 },
    _sources: [ { type: ObjectId , ref: 'Source' } ],
    results: [ { type: ObjectId , ref: 'Track', populate: ['get'] } ],
  }
}

module.exports = Search;
