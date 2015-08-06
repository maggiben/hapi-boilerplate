var Mongoose = require('mongoose');
var config = require('config').get('mongodb');

////////////////////////////////////////////////////////////////////////////////
// Mongo URL generator                                                        //
////////////////////////////////////////////////////////////////////////////////
var generateMongoUrl = function(config) {
    'use strict';

    if(config.username && config.password) {
        return 'mongodb://' +
            config.username + ':' +
            config.password + '@' +
            config.hostname + ':' +
            config.port + '/' +
            config.db;
    }
    else{
        return 'mongodb://' + config.hostname + ':' + config.port + '/' + config.db;
    }
};

Mongoose.connect(generateMongoUrl(config));

////////////////////////////////////////////////////////////////////////////////
// Mongoose event listeners                                                   //
////////////////////////////////////////////////////////////////////////////////
Mongoose.connection.once('open', function() {
    console.log('mongodb connected: ', generateMongoUrl(config));
});
Mongoose.connection.on('error', function(error) {
    console.error.bind(console, 'connection error %s', error);
});
Mongoose.connection.once('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

exports.Mongoose = Mongoose;
exports.db = Mongoose.connection;
