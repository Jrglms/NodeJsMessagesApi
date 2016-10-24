// Constants
var port = 3000;

// Initialize required modules
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Logging
var logWriter = require("./logWriters/serverLogWriter");
logWriter.init();
require("./appConfig").logWriter = logWriter;

// Initialize common project
require("common")(logWriter);

// Routing
require("./controllers").init(app);

// Initialize server
var server = require("http").createServer(app);
server.listen(port);