(function (appConfig) {

    var _database = require("./data/mongoDatabase");
    var _url = "mongodb://localhost:27017/MessagesApi";

    var _db = null;

    appConfig.getDatabase = function (next) {

        if (_db) {
            next(null, _db);
        }
        else {
            _database.connect(_url, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    _db = {
                        db: db,
                        conversations: db.collection("conversations")
                    };
                    next(null, _db);
                }
            });
        }
    };

    appConfig.logWriter = null;
    
})(module.exports)