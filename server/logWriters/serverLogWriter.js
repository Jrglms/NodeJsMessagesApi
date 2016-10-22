(function (serverLogWriter) {
    
    var logWritter = null;

    serverLogWriter.init = function () {

        var consoleLogWritter = require("common/logWriters/consoleLogWriter");
        consoleLogWritter.init();

        logWritter = consoleLogWritter;
    };

    serverLogWriter.write = function (category, message) {

        logWritter.write(category, message);
    };

})(module.exports);