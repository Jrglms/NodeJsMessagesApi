(function (controllers) {

    controllers.init = function (app, logWriter) {
        
        var authenticationController = require("./authenticationController");
        var messagesController = require("./messagesController");
        
        authenticationController.init(app, logWriter);
        messagesController.init(app, logWriter);
    };

})(module.exports);