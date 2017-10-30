module.exports = {
  home: __dirname,

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
  }
}