module.exports = {
  ip: process.env.IP || undefined,
  port: process.env.PORT || 8080,
  secrets: {
    session: process.env.SESSION_SECRET || 'session-secret',
  },
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/gigsterProject',
  },
};
