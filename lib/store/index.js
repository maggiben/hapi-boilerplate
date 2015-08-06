//var Hapi = require('hapi')
var Joi = require('joi');
var Store = require('./store');

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/store',
        config: {
            //auth: true,
            pre: [{
                method: Store.validateInput,
                assign: 'store'
            }],
            handler: Store.create,
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().max(256),
                    image: Joi.string().required(),
                    price: Joi.number().positive().default(0)
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/store',
        config: {
            handler: Store.readAll,
            validate: {
                query: {
                    name: Joi.string(),
                    price: Joi.number().positive(),
                    description: Joi.string(),
                    created: Joi.date(),
                    skip: Joi.number().positive().default(0),
                    limit: Joi.number().positive().default(0)
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/store/{id}',
        config: {
            handler: Store.readOne,
            validate: {
                params: {
                    // Validate ObjectId
                    id: Joi.string()
                }
            }
        }
    });

    /*server.route({
        method: 'PUT',
        path: '/store/{id}',
        config: {
            handler: Store.update,
            validate: {
                params: {
                    id: Joi.string()
                }
            }
        }
    });
    */
    server.route({
        method: 'DEL',
        path: '/store/{id}',
        config: {
            handler: Store.delete
        }
    });

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
