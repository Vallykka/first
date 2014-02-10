var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

TopicProvider = function (host, port) {
    this.db = new Db('forum', new Server(host, port, { auto_reconnect: true }, {}));
    this.db.open(function () {});
};

TopicProvider.prototype.getCollection = function (callback) {
    this.db.collection('topics', function (error, topic_collection) {
        if (error) callback(error);
        else callback(null, topic_collection);
    });
};

TopicProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, topic_collection) {
        if (error) callback(error);
        else {
            topic_collection.find().toArray(function (error, results) {
                if (error) callback(error);
                else callback(null, results);
            });
        }
    });
};

TopicProvider.prototype.findById = function (id, callback) {
    this.getCollection(function (error, topic_collection) {
        if (error) callback(error);
        else {
            topic_collection.findOne({_id: topic_collection.db.bson_serializer.ObjectID.createFromHexString(id) }, function (error, topic) {
                if (error) callback(error);
                else callback(null, topic);
            });
        }
    });
};

TopicProvider.prototype.save = function (topics, callback) {
    this.getCollection(function (error, topic_collection) {
        if (error) callback(error);
        else {
            if (typeof (topics.length) == "undefined")
                topics = [topics];

            for (var i = 0; i < topics.length; i++) {
                topic = topics[i];
                var date = new Date();
                topic.created_at = date.toLocaleDateString() + " " + (date.toLocaleTimeString());
                if (topic.advertisement === undefined) topic.advertisement = [];
                for (var j = 0; j < topic.advertisement.length; j++) {
                    topic.advertisement[j].created_at = date.toLocaleDateString() + " " + (date.toLocaleTimeString());
                }
            }

            topic_collection.insert(topics, function () {
                callback(null, topics);
            });
         }
    });
};
TopicProvider.prototype.addPostToTopic = function (topicId, post, callback) {
    this.getCollection(function (error, topic_collection) {
        if (error) callback(error);
        else {
            topic_collection.update(
            { _id: topic_collection.db.bson_serializer.ObjectID.createFromHexString(topicId)},
            { "$push": { advertisement: post} },
            function (error, topic) {
                if (error) callback(error);
                else callback (null, topic)
            });
        }
    });
};
exports.TopicProvider = TopicProvider;