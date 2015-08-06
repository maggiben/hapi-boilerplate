exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            auth: false,
            handler: function (request, reply) {

                return reply({ ver: process.env.npm_package_version });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
