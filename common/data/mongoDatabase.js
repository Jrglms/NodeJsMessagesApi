(function (mongoDatabase) {
    
    var _mongoDb = require("mongodb");

    mongoDatabase.connect = function (url, next) {
        
        _mongoDb.MongoClient.connect(url, function (err, db) {
            if (err) {
                next(err, null);
            } else {
                next(null, db);
            }
        });
    }

})(module.exports)