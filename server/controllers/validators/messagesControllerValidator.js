(function (messagesControllerValidator) {
    
    messagesControllerValidator.init = function (app, logWriter) {
        
        var is = require("common/helpers/is");

        app.get("/groups/:groupId/messages", function (req, res, next) {

            logWriter.write("debug", "Validating input...");

            if (is.integer(req.params.groupId)) {

                logWriter.write("debug", "Valid input.");

                next();
                return;
            }
            logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

            res.status(422).send("GroupId must be an integer.");
        });

        app.get("/users/:userId/messages", function (req, res, next) {

            logWriter.write("debug", "Validating input...");

            if (is.integer(req.params.userId)) {

                logWriter.write("debug", "Valid input.");

                next();
                return;
            }
            logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

            res.status(422).send("UserId must be an integer.");
        });
        
    }

})(module.exports)