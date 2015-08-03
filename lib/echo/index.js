var Hapi = require('hapi')
var Joi = require('joi')
var Echo = require('./echo');

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/echo',
        config: {
            //auth: true,
            pre: [{
                method: Echo.validateInput
            }/*,
            {
                method: Credentials.createUser,
                assign: 'user'
            },
            {
                method: Credentials.issueToken,
                assign: 'key'
            }*/],
            handler: Echo.echo,
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    email: Joi.string().required().email(),
                    password: Joi.string().alphanum().required().min(4)
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
