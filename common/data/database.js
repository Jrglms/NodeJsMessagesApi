(function (database) {

    var mongoDb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/MessagesApi";
    var db = null;

    database.getDb = function (next) {

        if (!db) {
            mongoDb.MongoClient.connect(mongoUrl, function (err, createdDb) {
                if (err) {
                    next(err, null);
                } else {
                    db = createdDb;
                    next(null, db);
                }
            });
        } else {
            next(null, db);
        }
    }

})(module.exports)