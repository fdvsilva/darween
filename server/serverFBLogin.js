var express = require('express')
  , logger = require('morgan')
  , session = require('express-session')

var Grant = require('grant-express')
  , grant = new Grant(require('./config.json'))

  var request = require('request')
  var promise = require('bluebird')
  var purest = require('purest')({request, promise})
  var config = require('@purest/providers')
var facebook = purest({provider: 'facebook', config})

var app = express()
app.use(logger('dev'))
// REQUIRED:
app.use(session({secret:'very secret'}))
// mount grant
app.use(grant)

app.get('/handle_facebook_callback', function (req, res) {
  console.log("AT:" +  req.query.access_token)
  res.end(JSON.stringify(req.query, null, 2))
})

app.get('/handle_twitter_callback', function (req, res) {
  console.log(req.query)
  res.end(JSON.stringify(req.query, null, 2))
})

app.listen(3001, function() {
  console.log('Express server listening on port ' + 3001)
})
