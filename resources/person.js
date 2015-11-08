var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Person = {
  attributes: {
    email: { type: String , max: 240 , unique: true, sparse: true },
    username: { type: String , max: 40 , slug: true },
    password: { type: String , max: 240 , masked: true , required: true },
    roles: [{ type: String, enum: ['editor', 'moderator', 'admin'] }],
    created: { type: Date, default: Date.now, required: true },
    avatar: {
      url: { type: String , max: 240 , default: '/img/user-avatar.png' }
    },
    bio: { type: String, default: '' }
  }
}

module.exports = Person;
