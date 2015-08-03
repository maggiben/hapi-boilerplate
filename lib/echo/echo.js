var Boom = require('boom');


exports.validateInput = function (request, reply) {
    var data = request.payload;
    if(!data) {
        return reply(Boom.badImplementation('An error occurred'));
    } else {
        reply();
    }
};

exports.echo = function (request, reply) {
    var data = request.payload;
    return reply(request.payload);
};
