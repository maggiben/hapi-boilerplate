// Load modules

var Util = require('util');
var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Sinon = require('sinon');
var Routes = require('../lib/store');
var Routes = require('../lib/store');
var Mongoose = require(process.cwd() + '/lib/mongo');
var Connection = require('mongoose').connect('mongodb://localhost/test');

//var Db = require('../lib/db');

// Declare internals
var internals = {};

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var expect = Code.expect;

describe('info', function () {

    beforeEach(function (done) {
        //console.log("before")
        return done();
    });

    afterEach(function (done) {
        //console.log("after")
        return done();
    });

    it('returns true on true', function (done) {
        return done();
    });

    it('creates a store item', function (done){
        var server = new Hapi.Server();
        server.connection();
        server.register(Routes, function (err) {

            expect(err).to.not.exist();

            var request = {
                method: 'POST',
                url: 'http://example.com:8080/store',
                payload: {
                    name: 'cabernet',
                    description: 'From Frace',
                    price: 320
                }
            };
            server.inject(request, function (res) {
                expect(res.statusCode).to.equal(201);
                done();
            });
        });
    });

    it('cannor duplicate a store item', function (done){
        var server = new Hapi.Server();
        server.connection();
        server.register(Routes, function (err) {

            expect(err).to.not.exist();

            var request = {
                method: 'POST',
                url: 'http://example.com:8080/store',
                payload: {
                    name: 'cabernet',
                    description: 'From Frace',
                    price: 320
                }
            };
            server.inject(request, function (res) {
                expect(res.statusCode).to.equal(409);
                done();
            });
        });
    });

    /*it('remove a store item', function (done){
        var server = new Hapi.Server();
        server.connection();
        server.register(Routes, function (err) {

            expect(err).to.not.exist();

            var request = {
                method: 'DEL',
                url: 'http://example.com:8080/store/',
                payload: {
                    name: 'cabernet',
                    description: 'From Frace',
                    price: 320
                }
            };
            server.inject(request, function (res) {
                expect(res.statusCode).to.equal(409);
                done();
            });
        });
    });*/

    it('returns the current app version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Routes, function (err) {

            expect(err).to.not.exist();

            console.log("STORE: ", Routes)
            var request = {
                method: 'GET',
                url: '/store'
            };

            server.inject(request, function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
});
