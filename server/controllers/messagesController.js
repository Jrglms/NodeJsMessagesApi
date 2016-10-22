(function (messagesController) {
    
    messagesController.init = function (app, logWriter) {

        var manager = require("common/managers/messagesManager");
        manager.init(logWriter)

        app.get("/messages/:category", function (req, res) {

            var category = req.params.category.toLowerCase();

            logWriter.write("debug", "Getting messages with category '" + category + "'...");

            switch (category) {
                case "global":
                    var messages = manager.getGlobalMessages();
                    break;
                case "group":
                    var messages = manager.getGroupMessages();
                    break;
                case "private":
                    var messages = manager.getPrivateMessages();
                    break;
                default:
                    var errorMessage = "Category '" + category + "' not supported";
                    logWriter.write("warning", errorMessage);
                    res.send(errorMessage);
                    return;
            }
            
            res.send(messages);
        });

    }

})(module.exports)