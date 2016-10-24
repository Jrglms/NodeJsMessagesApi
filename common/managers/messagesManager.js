(function (messagesManager) {

    var _logWriter = null;
    var _conversationsRepository = require("../repositories/conversationsRepository")

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.addGlobalMessage = function (userId, message, next) {

        _logWriter.write("debug", "Adding global message...");

        _conversationsRepository.findOneAndUpdate({ category: 1 }, { $push: { messages: { message: message, userId: userId } } }, { upsert: true }, function (err) {
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

        _conversationsRepository.findOneAndUpdate({ category: 2, groupId: groupId }, { $push: { messages: { message: message, userId: userId } } }, { upsert: true }, function (err) {
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

        _conversationsRepository.findOneAndUpdate({ category: 3, userIds: [senderUserId, receiverUserId].sort(function (a, b) { return a - b; }) }, { $push: { messages: { message: message, userId: senderUserId } } }, { upsert: true }, function (err) {
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

        _conversationsRepository.list({ category: 1 }, { messages: true }, function (err, results) {
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
        
        _conversationsRepository.list({ category: 2, groupId: groupId }, { messages: true }, function (err, results) {
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

        _conversationsRepository.list({ category: 3, userIds: [requestingUserId, userId].sort(function (a, b) { return a - b; }) }, { messages: true }, function (err, results) {
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