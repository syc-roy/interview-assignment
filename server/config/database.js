const database = {
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/beaconcrystal'
  }
};

module.exports = database;
