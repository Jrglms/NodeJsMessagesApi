(function (messagesManager) {

    var _logWriter = null;
    var _conversationsRepository = require("../repositories/conversationsRepository")

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.addGlobalMessage = function (userId, message, next) {

        _logWriter.write("debug", "Adding global message...");

        _conversationsRepository.findOneAndUpdate(
            { userIds: { $exists: false }, groupId: { $exists: false } }, // Query
            { $push: { messages: { message: message, userId: userId } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add new message. Error:\n" + "\t" + err);
                    next(err);
                }
                else {
                    next(null);
                }
            });
    }

    messagesManager.addGroupMessage = function (userId, groupId, message, next) {

        _logWriter.write("debug", "Adding a new group message...");

        _conversationsRepository.findOneAndUpdate(
            { groupId: groupId }, // Query
            { $push: { messages: { message: message, userId: userId } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add new message. Error:\n" + "\t" + err);
                    next(err);
                }
                else {
                    next(null);
                }
            });
    }

    messagesManager.addPrivateMessage = function (senderUserId, receiverUserId, message, next) {

        _logWriter.write("debug", "Adding a new private message...");

        var integerSort = require("../helpers/integerSort");

        _conversationsRepository.findOneAndUpdate(
            { userIds: [senderUserId, receiverUserId].sort(integerSort.asc) }, // Query
            { $push: { messages: { message: message, userId: senderUserId } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                if (err) {
                    _logWriter.write("error", "Could not add new message. Error:\n" + "\t" + err);
                    next(err);
                }
                else {
                    next(null);
                }
            });
    }

    messagesManager.getGlobalMessages = function (next) {

        _logWriter.write("debug", "Getting global messages...");

        _conversationsRepository.list(
            { userIds: { $exists: false }, groupId: { $exists: false } }, // Query
            { messages: true }, // Projection
            function (err, results) {
                if (err) {
                    _logWriter.write("error", "Failed to get global messages.\n" + "Error message:\n" + "\t" + err);
                    next(err, null);
                } else {
                    switch (results.length) {
                        case 0:
                            _logWriter.write("debug", "No collection was found. Returning empty array.");
                            next(null, []);
                            break;
                        case 1:
                            _logWriter.write("debug", "The collection was found. Returning the associated messages.");
                            next(null, results[0].messages);
                            break;
                        default:
                            var errorMessage = "More than a collection of global messages was returned.";
                            _logWriter.write("error", errorMessage);
                            next(errorMessage, null);
                            break;
                    }
                }
            });
    };

    messagesManager.getGroupMessages = function (groupId, next) {

        _logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");
        
        _conversationsRepository.list(
            { groupId: groupId }, // Query
            { messages: true }, // Projection
            function (err, results) {
                if (err) {
                    _logWriter.write("error", "Failed to get group messages.\n" + "Error message:\n" + "\t" + err);
                    next(err, null);
                } else {
                    switch (results.length) {
                        case 0:
                            _logWriter.write("debug", "No collection was found. Returning empty array.");
                            next(null, []);
                            break;
                        case 1:
                            _logWriter.write("debug", "The collection was found. Returning the associated messages.");
                            next(null, results[0].messages);
                            break;
                        default:
                            var errorMessage = "More than a collection of group messages was returned.";
                            _logWriter.write("error", errorMessage);
                            next(errorMessage, null);
                            break;
                    }
                }
            });
    };

    messagesManager.getPrivateMessages = function (requestingUserId, userId, next) {

        _logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

        var integerSort = require("../helpers/integerSort");

        _conversationsRepository.list(
            { userIds: [requestingUserId, userId].sort(integerSort.asc) }, // Query
            { messages: true }, // Projection
            function (err, results) {
                if (err) {
                    _logWriter.write("error", "Failed to get private messages.\n" + "Error message:\n" + "\t" + err);
                    next(err, null);
                } else {
                    switch (results.length) {
                        case 0:
                            _logWriter.write("debug", "No collection was found. Returning empty array.");
                            next(null, []);
                            break;
                        case 1:
                            _logWriter.write("debug", "The collection was found. Returning the associated messages.");
                            next(null, results[0].messages);
                            break;
                        default:
                            var errorMessage = "More than a collection of private messages was returned.";
                            _logWriter.write("error", errorMessage);
                            next(errorMessage, null);
                            break;
                    }
                }
            });
    };

})(module.exports)