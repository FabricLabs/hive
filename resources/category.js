var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Category = {
  attributes: {
    name: { type: String, max: 200, required: true, slug: true }
  }
}

module.exports = Category;
