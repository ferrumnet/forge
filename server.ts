'use strict';

var app = require('./index');
var http = require('http');
var webSockets = require('./app/lib/webSockets')();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
(async () => {
  var server = http.Server(app);
  server.listen(process.env.port || 8080);

  server.on('listening', function () {
    (global as any).log.info('Server listening on http://localhost:%d', server.address().port);
  });
  
})().catch(e => {
  console.log(e)
});
