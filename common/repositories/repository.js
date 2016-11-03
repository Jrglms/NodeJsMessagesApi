(function (repository) {
    
    var _db = null;

    repository.init = function (db) {

        _db = db;
    }

    repository.getFilter = function (name, comparison, value) {

        return {
            name: name,
            comparison: comparison,
            value: value
        };
    }

    repository.list = function (kind, ancestorIdentifier, filters, next) {

        var query = _db.createQuery(kind);

        var ancestorKey = _db.key(ancestorIdentifier);

        query.hasAncestor(ancestorKey);

        if (filters) {
            for (filter of filters) {
                query.filter(filter.name, filter.comparison, filter.value);
            }
        }

        _db.runQuery(query, function (err, entities) {

            if (err) {
                next(err, null);
            }
            else {
                next(null, entities);
            }
        });
    };

    repository.upsert = function (identifier, entity, next) {

        var key = _db.key(identifier);

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