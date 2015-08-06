var Path = require('path');

var internals = {
    viewsPath: process.cwd() + '/views',
    publicPath: process.cwd() + '/public',
};

exports.register = function (server, options, next) {

    console.log(process.cwd(), internals.viewsPath)
    // Serve index.html
    server.views({
        engines: {
            jade: require("jade")
        },
        relativeTo: __dirname,
        path: internals.viewsPath,
        helpersPath: "helpers"
    });

    // Serve static files
    server.route({
        method: "GET",
        path: '/',
        handler: function(request, reply) {
            reply.view("index");
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: internals.publicPath,
                listing: true
            }
       }
    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
