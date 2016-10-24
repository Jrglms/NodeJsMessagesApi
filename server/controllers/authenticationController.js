(function (messagesController) {

    var _logWriter = require("../appConfig").logWriter;

    messagesController.init = function (app) {

        app.get("*", function (req, res, next) {

            _logWriter.write("debug", "Authenticating user...");

            var userId = req.headers["user-identifier"];

            if (userId) {

                var is = require("common/helpers/is");

                if (is.integer(userId)) {
                    _logWriter.write("debug", "Request made by user with Id '" + userId + "'.");

                    next();
                }
                else {
                    _logWriter.write("debug", "Invalid User-identifier provided.");

                    res.status(404).send("User-identifier header should be an integer.");
                }
            }
            else {
                _logWriter.write("debug", "User-identifier was not provided.");

                res.status(404).send("User-identifier header should be provided.");
            }
        })

    }

})(module.exports)