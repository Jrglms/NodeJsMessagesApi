(function (messagesControllerValidator) {

    var _logWriter = require("../../appConfig").logWriter;

    messagesControllerValidator.init = function (app) {
        
        var is = require("common/helpers/is");

        app.get("/groups/:groupId/messages", function (req, res, next) {

            _logWriter.write("debug", "Validating input...");

            if (is.integer(req.params.groupId)) {

                _logWriter.write("debug", "Valid input.");

                next();
                return;
            }
            _logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

            res.status(422).send("GroupId must be an integer.");
        });

        app.get("/users/:userId/messages", function (req, res, next) {

            _logWriter.write("debug", "Validating input...");

            if (is.integer(req.params.userId)) {

                _logWriter.write("debug", "Valid input.");

                next();
                return;
            }
            _logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

            res.status(422).send("UserId must be an integer.");
        });
        
    }

})(module.exports)