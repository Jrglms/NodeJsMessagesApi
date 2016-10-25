(function (consoleLogWriter) {
    
    consoleLogWriter.write = function (category, message) {

        console.log(message)
    }

})(module.exports)