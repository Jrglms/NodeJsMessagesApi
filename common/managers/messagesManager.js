(function (messagesManager) {

    var _logWriter = null;

    messagesManager.init = function (logWriter) {

        _logWriter = logWriter;
    }


        _logWriter.write("verbose", "Getting global conversations");
    };

})(module.exports)
