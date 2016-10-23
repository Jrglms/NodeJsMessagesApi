(function (messagesController) {
    
    messagesController.init = function (app, logWriter) {

        var manager = require("common/managers/messagesManager");
        manager.init(logWriter)

        app.get("*", function (req, res, next) {

            logWriter.write("debug", "Authenticating user...");

            logWriter.write("debug", "Work in progress. No authentication is required yet.");

            next();
        })

        app.get("/groups/:groupId/messages", function (req, res) {

            var groupId = req.params.groupId.toLowerCase();

            logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");
            
            var messages = manager.getGroupMessages(groupId);

            res.send(messages);
        });

        app.get("/users/:userId/messages", function (req, res) {

            var requestingUserId = 0; // Get from header
            var userId = req.params.userId.toLowerCase();

            logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");
            
            var messages = manager.getPrivateMessages(requestingUserId, userId);

            res.send(messages);
        });

        app.get("/messages", function (req, res) {
            
            logWriter.write("debug", "Getting global messages...");
            
            var messages = manager.getGlobalMessages();

            res.send(messages);
        });

    }

})(module.exports)