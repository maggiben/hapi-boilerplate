var Glue = require('glue');
//var Db = require('./lib/db');

var internals = {};
internals.manifest = require('config').get('manifest');

internals.options = {
    relativeTo: process.cwd() + '/lib'
};

Glue.compose(internals.manifest, internals.options, function (error, server) {

    if (error) {
        throw error;
    }

    server.start(function (error) {

        if (error) {
            throw error;
        }

        server.log(['info', 'start'], {
            info: server.info
        });
    });
});

