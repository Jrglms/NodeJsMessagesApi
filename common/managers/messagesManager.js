(function (messagesManager) {

    var _logWriter = null;
    var _conversationsRepository = require("../repositories/conversationsRepository")

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
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
                        next(null, results.messages);
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

    messagesManager.getGroupMessages = function (groupId) {

        _logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");

        _logWriter.write("debug", "Not implemented yet.")
    };

    messagesManager.getPrivateMessages = function (requestingUserId, userId) {

        _logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

        _logWriter.write("debug", "Not implemented yet.")
    };

})(module.exports)