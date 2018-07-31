const path = require('path');

module.exports = {

  home: __dirname,
  logPath: path.join(__dirname, '/logs/app'),
  db: {
    "development": {
      'host': '127.0.0.1',
      'port': '27017',
      'db': 'nicefish',
      'is_debug': true
    },
    "production": {
      'host': '127.0.0.1',
      'port': '27017',
      'db': 'nicefish',
      'is_debug': false
    }
  },
  hosts: {
    'portfolio': 'http://220.249.243.51'
  }
}