var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var ws_server = require('./websockets-server');

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request');
  var file_path = extract(req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
