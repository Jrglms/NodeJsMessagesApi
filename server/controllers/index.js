(function (controllers) {

    var authenticationController = require("./authenticationController");
    var messagesController = require("./messagesController");

    controllers.init = function (app, logWriter) {

        authenticationController.init(app, logWriter);
        messagesController.init(app, logWriter);
    };

})(module.exports);