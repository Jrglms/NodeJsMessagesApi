(function (authenticationController) {

    authenticationController.init = function (app) {

        var logWriter = require("../appConfig").logWriter;

        app.all("*", function (req, res, next) {

            logWriter.write("debug", "Authenticating user...");

            var userId = req.headers["user-identifier"];

            if (userId) {

                var is = require("common/helpers/is");

                if (is.integer(userId)) {
                    logWriter.write("debug", "Request made by user with Id '" + userId + "'.");

                    next();
                }
                else {
                    logWriter.write("debug", "Invalid User-identifier provided.");

                    res.status(404).send("User-identifier header should be an integer.");
                }
            }
            else {
                logWriter.write("debug", "User-identifier was not provided.");

                res.status(404).send("User-identifier header should be provided.");
            }
        })

    }

})(module.exports)