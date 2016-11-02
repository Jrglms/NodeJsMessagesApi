(function (datastoreDatabase) {
    
    datastoreDatabase.connect = function (config, next) {

        var db = require('google-cloud')(_databaseConfig).datastore();

        next(null, db);
    }
    
})(module.exports)