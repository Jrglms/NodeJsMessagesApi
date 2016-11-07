# NodeJsMessagesApi
Http Api to send and retrieve messages based on Node.js, Express.js and MongoDB.

# Installation
## In a Windows environment:
- Make sure you have npm installed in your machine and added to the path.
- Download the project.
- In the root of the project, run the powershell script install.ps1.

## In other environments:
I have not tested it in different environments, but as far as I know, I have not used any windows specific feature or module.
- Make sure you have npm installed and added to the path.
- Download the project.
- Go to the common folder and run
  - `npm install`
- Go to the server project and run
  - `npm ln ../common`
  - `npm install`

# Running the server
You need to have an instance of MongoDB running.
- Go to `/common/appConfig.js` and update _\_url_ with the connection string to the MongoDB instance.
- Go to `/server/appConfig.js` and update _appConfig.port_ with the port number the server will be listening at.
- Run `/server/server.js`.

This will start an instance of the server that will wait for requests to arrive.

# Communicating with the Api
At this moment, the Api only allows messages to be sent or retrieved. Use `GET` to retrieve the messages and `POST` to add new ones. A message will have one of this three categories:
- *Global.* Use the url `/messages` to access them.
- *Group.* Use the url `/groups/<GroupId>/messages`, being *\<GroupId\>* the identifier of the group, to access them.
- *Private.* Use the url `/users/<UserId>/messages` to access the private messages between the requesting user and the user with identifier *\<UserId\>*.

A Http header with key *user-identifier* has to be provided. Its value will be the identifier of the requesting user. At this moment a random number can be provided, no authentication has been implemented.

## Understanding the database architecture
The database and _conversations_ collection will be created on the first run of the server. The messages will be added when requested by the user. If a conversation is not created when trying to add a new comment, it will be automatically created.

Only one _Global_ conversation will be created. This document will just have a collection of _messages_.

Each group will have its own _Group_ conversation. This document will have a collection of _messages_ and a _groupId_ property indicating which group it belongs to.

_Private_ conversations will be created the first time one of the users sends a message to the other. This document will have a collection of _messages_ and an array of _userIds_ with the two users involved in the conversation. This array will have an ascendant order.

A message will have the following structure:
```json
{
  "date": ISODate("yyyy-MM-ddThh:mm:ss.fffZ"),
  "message": "",
  "userId": 0,
  "userIp": "::1"
}
```

Being _date_ the date and time when the message was posted, _message_ the text of the message, _userId_ the identifier of the user posting the message and _userIp_ the Ip address from where the user posted the message. 

# Adding a new message
Use `POST` to of the urls provided before to post a message to the desired category, providing the body as follows:
```json
{
  "message": "Text of the new message"
}
```

The body should be a json object and `Content-Type: application/json` should be included in the headers.

# Getting a collection of messages
Use `GET` to one of the urls provided before to get the collection of messages.

If required, include `dateTo` and/or `dateFrom` in the query string to filter the messages by a range of time. Make sure the date can be understood by javascript.

# Other notes
- This project has been used to learn how to build an API with Node.js. _Shawn Wildermuth_'s Pluralsight course _Node.js for .NET Developers_ has been followed to understand and implement the basic functionality of the project.
- There is a branch prepared to talk with Google Cloud Datastore instead of MongoDb. To use it, just download the branch and the credentials file of a datastore project. Rename the file as `cloudDatastoreCredentials.json` and add it to the server folder. After that, follow the previous instructions.
  - When retrieving the messages an index will be needed. You need to upload it to the Datastore. For that, I downloaded gcloud tools for windows and run `gcloud preview datastore create-indexes .\index.yaml`.
