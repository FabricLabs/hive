var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Key = {
  attributes: {
    public: { type: String },
    private: { type: String }
  }
}

module.exports = Key;
