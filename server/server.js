// Constants
var port = 3000;

// Initialize required modules
var app = require("express")();

// Logging
var logWriter = require("./logWriters/serverLogWriter");
logWriter.init();

// Routing
require("./controllers").init(app, logWriter);

// Initialize server
var server = require("http").createServer(app);
server.listen(port);