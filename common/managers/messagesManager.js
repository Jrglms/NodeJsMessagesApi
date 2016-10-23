(function (messagesManager) {

    var _logWriter = null;

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.getGlobalMessages = function () {

        _logWriter.write("debug", "Getting global messages...");

        _logWriter.write("debug", "Not implemented yet.")
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