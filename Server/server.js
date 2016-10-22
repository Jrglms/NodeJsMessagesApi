// Constants
var port = 3000;

// Initialize required modules
var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers")

// Routing
controllers.init(app);

// Initialize server
var server = http.createServer(app);
server.listen(port);