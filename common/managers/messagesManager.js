(function (messagesManager) {

    var _logWriter = null;
    var _messagesRepository = require("../repositories/messagesRepository")

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.getGlobalMessages = function (next) {

        _logWriter.write("debug", "Getting global messages...");

        _messagesRepository.list(function (err, results) {
            if (err) {
                _logWriter.write("error", "Failed to get global messages.\n" + "Error message:\n" + "\t" + err);
                next(err, null);
            } else {
                next(null, results);
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