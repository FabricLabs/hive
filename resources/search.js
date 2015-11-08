var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Search = {
  attributes: {
    //created: { type: Date, required: true, default: Date.now },
    query: { type: String , required: true , max: 80 }
  }
}

module.exports = Search;