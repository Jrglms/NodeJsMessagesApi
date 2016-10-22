(function (messagesManager) {

    var _logWriter = null;

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.getGlobalMessages = function () {

        _logWriter.write("debug", "Getting global messages...");

        _logWriter.write("debug", "Not implemented yet.")
    };

    messagesManager.getGroupMessages = function () {

        _logWriter.write("debug", "Getting group messages...");

        _logWriter.write("debug", "Not implemented yet.")
    };

    messagesManager.getPrivateMessages = function () {

        _logWriter.write("debug", "Getting private messages...");

        _logWriter.write("debug", "Not implemented yet.")
    };

})(module.exports)