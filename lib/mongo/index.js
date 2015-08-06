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
    } else {
        return 'mongodb://' +
            config.hostname + ':' +
            config.port + '/' +
            config.db;
    }
};

/**
 * Connects to a mongoDB database using the 'MONGOLAB_URI' ENV var.
 * @return Stream connection stream to pipe to
 */
exports.register = function (server, options, next) {

    var connString = process.env.MONGO_URL || 'mongodb://localhost/pager';
    Mongoose.connect(generateMongoUrl(config), options);

    var connection = Mongoose.connection;

    connection.once('open', function() {
        console.log('mongodb connected: ', generateMongoUrl(config));
    });
    connection.on('error', function (err) {
        server.log(['error', 'mongo'], 'connection error', { err: err });
    });

    connection.once('open', function () {
        server.log(['info', 'mongo'], 'connected to mongo DB');
        return next();
    });

};

exports.register.attributes = {
    pkg: require('./package.json')
};
