var http = require('http');

var port = 3000;

var server = http.createServer(function (req, res) {
    res.end('Hello World\n');
});

server.listen(port);