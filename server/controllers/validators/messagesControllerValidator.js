(function (messagesControllerValidator) {

    messagesControllerValidator.init = function (app) {

        var logWriter = require("../../appConfig").logWriter;

        var is = require("common/helpers/is");
        var string = require("common/helpers/string");

        app.get("/messages", function (req, res, next) {

            validateDates(req, res, next);
        });

        app.all("/groups/:groupId/messages", function (req, res, next) {

            logWriter.write("debug", "Validating input...");

            if (is.integer(req.params.groupId)) {

                logWriter.write("debug", "Valid path.");
                
                validateDates(req, res, next);
                return;
            }

            logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

            res.status(422).send("GroupId must be an integer.");
        });

        app.all("/users/:userId/messages", function (req, res, next) {
            
            logWriter.write("debug", "Validating input...");
            var requestingUserId = req.headers["user-identifier"];
            var userId = req.params.userId;

            if (!is.integer(userId)) {
                
                logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

                res.status(422).send("UserId must be an integer.");
                return;
            }
            if (userId == requestingUserId) {

                logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

                res.status(422).send("UserId cannot be the equal to the requesting user-identifier.");
                return;
            }

            logWriter.write("debug", "Valid path.");

            validateDates(req, res, next);
        });

        app.post("/messages", function (req, res, next) {

            validateMessage(req, res, next);
        });

        app.post("/groups/:id/messages", function (req, res, next) {

            validateMessage(req, res, next);
        });

        app.post("/users/:id/messages", function (req, res, next) {

            validateMessage(req, res, next);
        });

        var validateDates = function (req, res, next) {

            if (req.query.dateFrom)
                if (!is.date(req.query.dateFrom)) {

                    logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

                    res.status(422).send("DateFrom has to be a valid date.");
                    return;
                }
            if (req.query.dateTo)
                if (!is.date(req.query.dateTo)) {

                    logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

                    res.status(422).send("DateTo has to be a valid date.");
                    return;
                }

            logWriter.write("debug", "Valid query.");

            next();
        }

        var validateMessage = function (req, res, next) {
            
            if (string.isNullOrWhitespace(req.body.message)) {

                logWriter.write("debug", "Invalid input. Returning 422 UnprocessableEntity.")

                res.status(422).send("Message cannot be empty.");
                return;
            }

            logWriter.write("debug", "Valid body.");

            next();
        }
    }

})(module.exports)