'use strict'

const config = require('./config');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var connectionString, options

const env = process.env.NODE_ENV || "development";

const dbConfig = config.db[env];
const port = dbConfig.port
const isDebug = dbConfig.is_debug

var db = dbConfig.db
var host

if (isDebug) {
  console.log('提醒:debug状态连接数据库:')
  host = dbConfig.host
} else {
  console.log('警告:非debug状态连接数据库:')
  host = dbConfig.host
}

connectionString = 'mongodb://' + host + ':' + port + '/' + db

options = {
  useMongoClient: true,
  autoReconnect: true,
  poolSize: 5
}

console.log(connectionString)

db = mongoose.connection

db.on('connecting', function () {
  console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function () {
  console.log('MongoDB connected!');
});
db.once('open', function () {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  mongoose.connect(connectionString, options);
});
mongoose.connect(connectionString, options, function (err, res) {
  if (err) {
    console.log('Error connecting to: ', connectionString + '. ' + err)
    return process.exit(1)
  } else {
    return console.log('Successfully connected to: ', connectionString)
  }
});

module.exports = db
