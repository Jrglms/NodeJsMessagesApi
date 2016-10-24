(function (messagesController) {

    var _logWriter = require("../appConfig").logWriter;

    messagesController.init = function (app) {

        var manager = require("common/managers/messagesManager");

        var validator = require("./validators/messagesControllerValidator");
        validator.init(app);

        app.get("/groups/:groupId/messages", function (req, res) {

            var groupId = req.params.groupId;

            _logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");
            
            var messages = manager.getGroupMessages(groupId, function (err, messages) {
                if (err) {
                    _logWriter.write("error", "Could not get group messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get group messages.");
                } else {
                    _logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.get("/users/:userId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;

            _logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");
            
            var messages = manager.getPrivateMessages(requestingUserId, userId, function (err, messages) {
                if (err) {
                    _logWriter.write("error", "Could not get private messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get private messages.");
                } else {
                    _logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.get("/messages", function (req, res) {

            _logWriter.write("debug", "Getting global messages...");

            manager.getGlobalMessages(function (err, messages) {
                if (err) {
                    _logWriter.write("error", "Could not get global messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get global messages.");
                } else {
                    _logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.post("/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var message = req.body.message;

            _logWriter.write("debug", "Adding a new global message...");

            manager.addGlobalMessage(requestingUserId, message, function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add global message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add global message.");
                } else {
                    _logWriter.write("debug", "Global message added.");

                    res.sendStatus(201);
                }
            });
        });

        app.post("/groups/:groupId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var groupId = req.params.groupId;
            var message = req.body.message;

            _logWriter.write("debug", "Adding a new group message...");

            manager.addGroupMessage(requestingUserId, groupId, message, function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add group message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add group message.");
                } else {
                    _logWriter.write("debug", "Group message added.");

                    res.sendStatus(201);
                }
            });
        });

        app.post("/users/:userId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;
            var message = req.body.message;

            _logWriter.write("debug", "Adding private message between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

            manager.addPrivateMessage(requestingUserId, userId, message, function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add Private message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add private message.");
                } else {
                    _logWriter.write("debug", "Private message added.");

                    res.sendStatus(201);
                }
            });
        });

    }

})(module.exports)