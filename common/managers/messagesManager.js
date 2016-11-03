(function (messagesManager) {

    var _logWriter = require("../appConfig").logWriter;
    var _repository = require("../repositories/repository");
    
    var handleAddMessageResponse = function (err, next) {
        if (err) {
            _logWriter.write("error", "Could not add new message. Error:\n" + "\t" + err);
            next(err);
        }
        else {
            next(null);
        }
    }

    var handleGetMessagesResponse = function (err, results, next) {
        if (err) {
            _logWriter.write("error", "Failed to get messages. Error message:\n" + "\t" + err);
            next(err, null);
        } else {
            _logWriter.write("debug", "Collection found. Returning the associated messages.");

            next(null, results);
        }
    }

    var getMessageEntity = function (message, userId, userIp, date) {

        return { message: message, userId: userId, userIp: userIp, date: date };
    }
    
    messagesManager.init = function (db) {

        _repository.init(db);
    }

    messagesManager.addGlobalMessage = function (userId, message, userIp, date, next) {

        _logWriter.write("debug", "Adding global message...");

        var identifier = ['GlobalConversation', 'default', 'Message'];

        var entity = getMessageEntity(message, userId, userIp, date);

        _repository.upsert(identifier, entity, function (err) {

            handleAddMessageResponse(err, next);
        });
    }

    messagesManager.addGroupMessage = function (userId, groupId, message, userIp, date, next) {

        _logWriter.write("debug", "Adding a new group message...");

        var identifier = ['GroupConversation', groupId, 'Message'];

        var entity = getMessageEntity(message, userId, userIp, date);

        _repository.upsert(identifier, entity, function (err) {

            handleAddMessageResponse(err, next);
        });
    }

    messagesManager.addPrivateMessage = function (senderUserId, receiverUserId, message, userIp, date, next) {

        var integerSort = require("../helpers/integerSort");

        _logWriter.write("debug", "Adding a new private message...");

        var userIds = [senderUserId, receiverUserId].sort(integerSort.asc);
        var identifier = ['PrivateConversation', userIds[0] + '_' + userIds[1], 'Message'];

        var entity = getMessageEntity(message, receiverUserId, userIp, date);

        _repository.upsert(identifier, entity, function (err) {

            handleAddMessageResponse(err, next);
        });
    }

    messagesManager.getGlobalMessages = function (dateFrom, dateTo, next) {

        _logWriter.write("debug", "Getting global messages...");

        var kind = 'Message';
        var ancestorIdentifier = ['GlobalConversation', 'default'];
        
        _repository.list(kind, ancestorIdentifier, function (err, results) {

            handleGetMessagesResponse(err, results, next);
        });
    };

    messagesManager.getGroupMessages = function (groupId, dateFrom, dateTo, next) {

        _logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");

        var kind = 'Message';
        var ancestorIdentifier = ['GroupConversation', groupId];

        _repository.list(kind, ancestorIdentifier, function (err, results) {

            handleGetMessagesResponse(err, results, next);
        });
    };

    messagesManager.getPrivateMessages = function (requestingUserId, userId, dateFrom, dateTo, next) {

        var integerSort = require("../helpers/integerSort");

        _logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

        var kind = 'Message';
        var userIds = [requestingUserId, userId].sort(integerSort.asc);
        var ancestorIdentifier = ['PrivateConversation', userIds[0] + '_' + userIds[1]];

        _repository.list(kind, ancestorIdentifier, function (err, results) {

            handleGetMessagesResponse(err, results, next);
        });
    };

})(module.exports)