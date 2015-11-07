var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Category = {
  attributes: {
    name: { type: String, max: 200, required: true }
  }
}

module.exports = Category;
