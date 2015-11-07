var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var Play = {
  attributes: {
    state: { type: String , enum: ['queued', 'playing', 'played', 'skipped'] , default: 'queued' },
    created: { type: Date, }, //required: true, default:  Date.now },
    started: { type: Date },
    ended: { type: Date },
    duration: { type: Number },
    score: { type: Number },
    votes: { type: Number },
    _track: { type: ObjectId, ref: 'Track', required: true, populate: ['get'] },
    _channel: { type: ObjectId, ref: 'Channel', required: true },
  }
}

module.exports = Play;
