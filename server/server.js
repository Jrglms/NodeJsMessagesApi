// Constants
var port = 3000;

// Initialize required modules
var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers")

// Logging
var logWriter = require("./logWriters/serverLogWriter");
logWriter.init();

// Routing
controllers.init(app, logWriter);

// Initialize server
var server = http.createServer(app);
server.listen(port);