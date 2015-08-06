// Load modules

var Util = require('util');
var Code = require('code');
var Version = require('../lib/info');
var Lab = require('lab');
var Hapi = require('hapi');

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

    it('returns the current app version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Version, function (err) {

            expect(err).to.not.exist();

            var request = {
                method: 'GET',
                url: 'http://example.com:8080/version'
            };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({
                    ver: process.env.npm_package_version
                });

                done();
            });
        });
    });
});
