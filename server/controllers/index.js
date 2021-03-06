﻿(function (controllers) {

    controllers.init = function (app) {

        var logWriter = require("../appConfig").logWriter;

        // Adding a line before each requests to make things more readable
        app.all("*", function (req, res, next) {

            logWriter.write("verbose", "");

            next();
        })

        var authenticationController = require("./authenticationController");
        var messagesController = require("./messagesController");
        
        authenticationController.init(app); // Always needs to be the first one being initialized. Authentication should always be done before attending a request.
        messagesController.init(app);

        // If request did not match any route, send back a 404
        app.all("*", function (req, res) {

            logWriter.write("debug", "User tried to reach a page that does not exist. Returning 404 NotFound.");

            res.sendStatus(404);
        })
    };

})(module.exports);