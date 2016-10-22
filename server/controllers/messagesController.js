(function (messagesController) {
    
    messagesController.init = function (app, logWriter) {

        var manager = require("common/managers/messagesManager");
        manager.init(logWriter)

        app.get("/messages/:category", function (req, res) {

            var category = req.params.category;

            logWriter.write("debug", "Getting messages with category: " + category + "...");

            var messages = manager.getGlobalMessages();

            res.send(messages);
        });

    }

})(module.exports)