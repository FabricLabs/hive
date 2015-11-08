module.exports = {
  service: {
    name: 'hive',
    namespace: 'hive'
  },
  database: {
    name: 'hive',
    string: process.env.MONGO_URL
  },
  services: {
    http: {
      port: process.env.PORT || 6333
    },
    youtube: {
      key: process.env.YOUTUBE_KEY || 'obtain key'
    }
  }
}
