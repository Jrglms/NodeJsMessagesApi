(function (messagesRepository) {

    var database = require("../data/database");

    messagesRepository.list = function (next) {

        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            }
            else {
                db.conversations.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

})(module.exports)