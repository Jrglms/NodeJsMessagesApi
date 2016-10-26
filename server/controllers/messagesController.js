(function (messagesController) {

    messagesController.init = function (app) {

        var logWriter = require("../appConfig").logWriter;

        var manager = require("common/managers/messagesManager");

        var validator = require("./validators/messagesControllerValidator");
        validator.init(app);

        app.get("/groups/:groupId/messages", function (req, res) {

            var groupId = req.params.groupId;

            logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");

            if (req.query.dateFrom)
                var dateFrom = new Date(req.query.dateFrom);
            if (req.query.dateTo)
                var dateTo = new Date(req.query.dateTo);

            var messages = manager.getGroupMessages(groupId, dateFrom, dateTo, function (err, messages) {
                if (err) {
                    logWriter.write("error", "Could not get group messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get group messages.");
                } else {
                    logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.get("/users/:userId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;

            if (req.query.dateFrom)
                var dateFrom = new Date(req.query.dateFrom);
            if (req.query.dateTo)
                var dateTo = new Date(req.query.dateTo);

            logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");
            
            var messages = manager.getPrivateMessages(requestingUserId, userId, dateFrom, dateTo, function (err, messages) {
                if (err) {
                    logWriter.write("error", "Could not get private messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get private messages.");
                } else {
                    logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.get("/messages", function (req, res) {

            logWriter.write("debug", "Getting global messages...");

            if (req.query.dateFrom)
                var dateFrom = new Date(req.query.dateFrom);
            if (req.query.dateTo)
                var dateTo = new Date(req.query.dateTo);
            
            manager.getGlobalMessages(dateFrom, dateTo, function (err, messages) {
                if (err) {
                    logWriter.write("error", "Could not get global messages. Error:\n" + "\t" + err);

                    res.status(500).send("Could not get global messages.");
                } else {
                    logWriter.write("debug", "Sending messages back...");

                    res.send(messages);
                }
            });
        });

        app.post("/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var message = req.body.message;
            var clientIp = req.ip;
            var date = new Date();

            logWriter.write("debug", "Adding a new global message...");

            manager.addGlobalMessage(requestingUserId, message, clientIp, date, function (err) {
                if (err) {
                    logWriter.write("error", "Could not add global message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add global message.");
                } else {
                    logWriter.write("debug", "Global message added.");

                    res.sendStatus(201);
                }
            });
        });

        app.post("/groups/:groupId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var groupId = req.params.groupId;
            var message = req.body.message;
            var clientIp = req.ip;
            var date = new Date();

            logWriter.write("debug", "Adding a new group message...");

            manager.addGroupMessage(requestingUserId, groupId, message, clientIp, date, function (err) {
                if (err) {
                    logWriter.write("error", "Could not add group message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add group message.");
                } else {
                    logWriter.write("debug", "Group message added.");

                    res.sendStatus(201);
                }
            });
        });

        app.post("/users/:userId/messages", function (req, res) {

            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;
            var message = req.body.message;
            var clientIp = req.ip;
            var date = new Date();

            logWriter.write("debug", "Adding private message between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

            manager.addPrivateMessage(requestingUserId, userId, message, clientIp, date, function (err) {
                if (err) {
                    logWriter.write("error", "Could not add Private message. Error:\n" + "\t" + err);

                    res.status(500).send("Could not add private message.");
                } else {
                    logWriter.write("debug", "Private message added.");

                    res.sendStatus(201);
                }
            });
        });

    }

})(module.exports)