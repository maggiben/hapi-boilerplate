var Glue = require('glue');
var internals = {};
internals.manifest = require('config').get('manifest');

internals.options = {
    relativeTo: process.cwd() + '/lib'
};

Glue.compose(internals.manifest, internals.options, function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }

        server.log(['info', 'start'], {
            info: server.info
        });
    });
});

console.log("pepep")

/*



*/
