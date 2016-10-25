﻿(function (serverLogWriter) {
    
    var _logWriter = null;

    serverLogWriter.init = function () {

        var consoleLogWritter = require("common/logWriters/consoleLogWriter");

        _logWriter = consoleLogWritter;
    };

    serverLogWriter.write = function (category, message) {

        _logWriter.write(category, message);
    };

})(module.exports);