(function (messagesManager) {

    var _logWriter = require("../appConfig").logWriter;
    var _conversationsRepository = require("../repositories/conversationsRepository");
    
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
            switch (results.length) {
                case 0:
                    _logWriter.write("debug", "No collection was found. Returning empty array.");
                    next(null, []);
                    break;
                case 1:
                    _logWriter.write("debug", "Collection found. Returning the associated messages.");
                    next(null, results[0].messages);
                    break;
                default:
                    var errorMessage = "More than a collection messages was returned. Only one was expected.";
                    _logWriter.write("error", errorMessage);
                    next(errorMessage, null);
                    break;
            }
        }
    }

    messagesManager.addGlobalMessage = function (userId, message, userIp, date, next) {

        _logWriter.write("debug", "Adding global message...");

        _conversationsRepository.findOneAndUpdate(
            { userIds: { $exists: false }, groupId: { $exists: false } }, // Query
            { $push: { messages: { message: message, userId: userId, userIp: userIp, date: date } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                handleAddMessageResponse(err, next);
            });
    }

    messagesManager.addGroupMessage = function (userId, groupId, message, userIp, date, next) {

        _logWriter.write("debug", "Adding a new group message...");

        _conversationsRepository.findOneAndUpdate(
            { groupId: groupId }, // Query
            { $push: { messages: { message: message, userId: userId, userIp: userIp, date: date } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                handleAddMessageResponse(err, next);
            });
    }

    messagesManager.addPrivateMessage = function (senderUserId, receiverUserId, message, userIp, date, next) {

        _logWriter.write("debug", "Adding a new private message...");

        var integerSort = require("../helpers/integerSort");

        _conversationsRepository.findOneAndUpdate(
            { userIds: [senderUserId, receiverUserId].sort(integerSort.asc) }, // Query
            { $push: { messages: { message: message, userId: senderUserId, userIp: userIp, date: date } } }, // Projection
            { upsert: true }, // Options
            function (err) {
                handleAddMessageResponse(err, next);
            });
    }

    messagesManager.getGlobalMessages = function (dateFrom, dateTo, next) {

        _logWriter.write("debug", "Getting global messages...");

        var queryObject = { $and: [{ userIds: { $exists: false } }, { groupId: { $exists: false } }] };
        
        if (dateFrom)
            queryObject.$and.push({ "messages.date": { $gte: dateFrom } });
        if (dateTo)
            queryObject.$and.push({ "messages.date": { $lte: dateTo } });

        _conversationsRepository.list(
            queryObject, // Query
            { messages: true }, // Projection
            function (err, results) {
                handleGetMessagesResponse(err, results, next);
            });
    };

    messagesManager.getGroupMessages = function (groupId, dateFrom, dateTo, next) {

        _logWriter.write("debug", "Getting group messages for group with Id '" + groupId + "'...");

        var queryObject = { $and: [{ groupId: groupId }] };

        if (dateFrom)
            queryObject.$and.push({ "messages.date": { $gte: dateFrom } });
        if (dateTo)
            queryObject.$and.push({ "messages.date": { $lte: dateTo } });

        _conversationsRepository.list(
            queryObject, // Query
            { messages: true }, // Projection
            function (err, results) {
                handleGetMessagesResponse(err, results, next);
            });
    };

    messagesManager.getPrivateMessages = function (requestingUserId, userId, dateFrom, dateTo, next) {

        var integerSort = require("../helpers/integerSort");

        _logWriter.write("debug", "Getting private messages between users with Ids '" + requestingUserId + "' and '" + userId + "'...");

        var queryObject = { $and: [{ userIds: [requestingUserId, userId].sort(integerSort.asc) }] };

        if (dateFrom)
            queryObject.$and.push({ "messages.date": { $gte: dateFrom } });
        if (dateTo)
            queryObject.$and.push({ "messages.date": { $lte: dateTo } });

        _conversationsRepository.list(
            queryObject, // Query
            { messages: true }, // Projection
            function (err, results) {
                handleGetMessagesResponse(err, results, next);
            });
    };

})(module.exports)