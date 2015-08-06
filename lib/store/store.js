var Boom = require('boom');
var HttpStatus = require('http-status-codes');
var Store = require('../../models/store');
var ObjectId = require('mongoose').Types.ObjectId;

exports.validateInput = function (request, reply) {
    var data = request.payload;
    if(!data) {
        return reply(Boom.badImplementation('An error occurred'));
    } else {
        reply();
    }
};

///////////////////////////////////////////////////////////////////////////////
// Route to create a Store item                                              //
//                                                                           //
// @param {Object} request                                                   //
// @param {Object} response                                                  //
// @param {Object} next                                                      //
// @return {Object} JSON newly created Store item                            //
//                                                                           //
// @api public                                                               //
//                                                                           //
// @url POST /store                                                          //
///////////////////////////////////////////////////////////////////////////////
exports.create = function(request, reply) {
    'use strict';

    Store.findOne({name: request.payload.name})
    .exec(function(error, store) {
        if (error) {
            return reply(Boom.badImplementation('Internal MongoDB error'))
                .code(HttpStatus.INTERNAL_SERVER_ERROR);
        } else if (store) {
            return reply(Boom.conflict('there was a conflic'));
        }
        store = new Store({
            name: request.payload.name,
            description: request.payload.description,
            image: request.payload.image,
            price: request.payload.price || 0
        });
        store.save(function(error, store) {
            if (error || !store) {
                return reply(Boom.badImplementation('Internal MongoDB error'))
                    .code(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return reply(store)
                .code(HttpStatus.CREATED);
        });
    });
};

exports.read = function (request, reply) {
    'use strict';

    var defaults = {
        skip : request.query.skip || 0,
        limit : request.query.limit || 0
    };

    var fields = ['name', 'price', 'created', 'description'];

    var query = (function() {
        return request.query ? {
            $or: [{
                name: request.query.name
            }, {
                price: request.query.price,
            }, {
                created: request.query.created
            }, {
                description: request.query.description
            }]
        } : {};
    })(request.query);

    Store.find({ $or: [request.query] })
    .limit(defaults.limit)
    .skip(defaults.skip)
    .exec(function(error, store) {
        if (error) {
            return reply(Boom.badImplementation('Internal MongoDB error'))
                .code(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(!store) {
            return reply(Boom.notFound('missing'))
                .code(HttpStatus.NOT_FOUND);
        }
        return reply(store);
    });
};

exports.readAll = function (request, reply) {
    'use strict';

    var defaults = {
        skip : request.query.skip || 0,
        limit : request.query.limit || 0
    };

    Store.find({})
    .limit(defaults.limit)
    .skip(defaults.skip)
    .exec(function(error, store) {
        if (error) {
            return reply(Boom.badImplementation('Internal MongoDB error'))
                .code(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(!store) {
            return reply(Boom.notFound('missing'))
                .code(HttpStatus.NOT_FOUND);
        }
        return reply(store);
    });
};

exports.readOne = function (request, reply) {
    'use strict';

    Store.find({_id: new ObjectId(request.params.id)})
    .exec(function(error, store) {
        if (error) {
            return reply(Boom.badImplementation('Internal MongoDB error'))
                .code(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(!store) {
            return reply(Boom.notFound('missing'))
                .code(HttpStatus.NOT_FOUND);
        }
        return reply(store);
    });
};

exports.delete = function (request, reply) {
    'use strict';

    Store.findOneAndRemove({_id: new ObjectId(request.params.id)})
    .exec(function(error, doc, result) {
        if (error) {
            return reply(Boom.badImplementation('Internal MongoDB error'))
                .code(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return reply({});
    });
};
