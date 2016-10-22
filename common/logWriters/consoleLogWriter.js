(function (consoleLogWriter) {

    consoleLogWriter.init = function () {

        console.log()
    }

    consoleLogWriter.write = function (category, message) {

        console.log(message)
    }

})(module.exports)