(function (consoleLogWriter) {

    consoleLogWriter.init = function () {
    }

    consoleLogWriter.write = function (category, message) {

        console.log(message)
    }

})(module.exports)