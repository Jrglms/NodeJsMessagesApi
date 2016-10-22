(function (controllers) {

    var messagesController = require("./messagesController");

    controllers.init = function (app, logWriter) {
        
        messagesController.init(app, logWriter);
    };

})(module.exports);