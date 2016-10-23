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
app.all("*", function (req, res) {

    logWriter.write("debug", "User tried to reach a page that does not exist. Returning 404 NotFound.");

    res.sendStatus(404);
})

// Initialize server
var server = http.createServer(app);
server.listen(port);