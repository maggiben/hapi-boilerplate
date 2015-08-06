var Mongoose = require('mongoose');
//var Validate = require('mongoose-validator');
//var Timestamps = require('mongoose-timestamp');
var Schema = Mongoose.Schema;

var Comment = new Schema({
    message: { type: String, required: true, trim: true },
    created: { type: Date, default: Date.now },
    likes: { type: Number, required: false, default: 1},
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: false
    }
});

var Store = new Schema({
    name: { type: String, required: true},
    image: { type: String, required: false},
    description: { type: String, required: true},
    created: { type: Date, default: Date.now },
    price: { type: Number, default: 0 },
    comments: [ Comment ]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: false
    }
});

Store.pre('save', function (next) {
    return next();
});


Store.methods.sanitize = function () {

    var store = this.toObject();

    delete store._id;
    delete store.__v;
    delete store.password;
    delete store.verifyHash;
    delete store.authSalt;
    delete store.isVerified;

    return store;
};


// adds created_at and updated_at fields;
/*Store.plugin(Timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});*/


module.exports = Mongoose.model('Store', Store);
