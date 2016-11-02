(function (datastoreDatabase) {
    
    datastoreDatabase.connect = function (config, next) {

        var db = require('google-cloud')(config).datastore();

        next(null, db);
    }
    
})(module.exports)