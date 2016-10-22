(function (messagesManager) {

    var _logWriter = null;

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }

    messagesManager.getGlobalMessages = function () {

        _logWriter.write("debug", "Getting global messages...");
    };

})(module.exports)