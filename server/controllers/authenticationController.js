(function (messagesController) {

    messagesController.init = function (app, logWriter) {

        app.get("*", function (req, res, next) {

            logWriter.write("debug", "Authenticating user...");

            logWriter.write("debug", "Work in progress. No authentication is required yet.");

            next();
        })

    }

})(module.exports)