(function (appConfig) {

    var _datastore = require('./data/datastoreDatabase');

    var _databaseConfig = {
        projectId: "nodejsmessagesapi",
        keyFilename: "/cloudDatastoreCredentials.json"
    }
    
    appConfig.getDatabase = function (next) {

        _datastore.connect(_databaseConfig, next);
    };

    appConfig.logWriter = null;
    
})(module.exports)