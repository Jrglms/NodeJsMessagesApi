(function (conversationsRepository) {
    
    var _appConfig = require("../appConfig");

    conversationsRepository.list = function (query, projection, next) {

        _appConfig.getDatabase(function (err, db) {
            if (err) {
                next(err, null);
            }
            else {
                db.conversations.find(query, projection).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    conversationsRepository.findOneAndUpdate = function (query, projection, options, next) {

        _appConfig.getDatabase(function (err, db) {
            if (err) {
                next(err, null);
            }
            else {
                db.conversations.findOneAndUpdate(query, projection, options, next);
            }
        });
    };

})(module.exports)