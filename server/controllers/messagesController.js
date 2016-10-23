(function (messagesController) {
    
    messagesController.init = function (app, logWriter) {

        var manager = require("common/managers/messagesManager");
        manager.init(logWriter)

        var validator = require("./validators/messagesControllerValidator");
        validator.init(app, logWriter);

        app.get("/groups/:groupId/messages", function (req, res) {

            var groupId = req.params.groupId;

            logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");
            
            var messages = manager.getGroupMessages(groupId);

            res.send(messages);
        });

        app.get("/users/:userId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;

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