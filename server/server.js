// Initialize required modules
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var appConfig = require("./appConfig");

// Logging
var logWriter = require("./logWriters/serverLogWriter");
logWriter.init();
appConfig.logWriter = logWriter;

// Initialize common project
require("common")(logWriter);

// Routing
require("./controllers").init(app);

// Initialize server
var server = require("http").createServer(app);
server.listen(appConfig.port);