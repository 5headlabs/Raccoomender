module.exports = {
  secret: process.env.JWT_SECRET,

  database: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sextv.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
  
  port:      process.env.PORT || 3001,
  test_port: process.env.PORT || 3001,
  test_db:   'test',
  test_env:  'test'
};
