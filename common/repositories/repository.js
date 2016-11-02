(function (repository) {
    
    var _db = null;

    repository.init = function (db) {

        _db = db;
    }
    
    repository.list = function (indentifier, next) {

        var key = db.key(identifier);

        _db.get(key, function (err, entity) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, entity.data);
            }
        });
    };

    repository.upsert = function (identifier, entity, next) {

        var key = db.key(identifier);

        var entityToSave = {
            key: key,
            data: entity
        };

        _db.save(entityToSave, function (err) {

            if (err) {
                next(err);
            }
            else {
                next(null);
            }
        });
    };

})(module.exports)