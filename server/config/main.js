module.exports = {
  // Secret key for JWT signing and encryption
  secret: process.env.JWT_SECRET,
  // Database connection information
  database: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sextv.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
  // Setting port for server
  port: 3001,
  test_port: 3001,
  test_db: 'test',
  test_env: 'test'

};
