const controller = require('../../routes/api/action/action.controller.js');
const config = require('config');
require('chai').should();

describe('Action Controller', function() {
    it('Create Action No ID', function(done) {
        controller
            .make({
                user: config.get('userOne'),
                name: 'actionOne',
                params: [{user: config.get('userOne'), command: 'Hello World'}],
            })
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                return controller.remove(response._id);
            })
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                done();
            });
    });

    it('Create Action', function(done) {
        controller
            .make({
                _id: config.get('actionOne'),
                user: config.get('userOne'),
                name: 'actionOne',
                params: [{user: config.get('userOne'), command: 'Hello World'}],
            })
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                done();
            });
    });


    it('Find Action', function(done) {
        controller
            .lookup(config.get('actionOne'))
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                done();
            });
    });

    it('Update Action', function(done) {
        controller
            .edit(config.get('actionOne'), {
                params: [{user: config.get('userOne'), command: 'Goodbye World'}],
            })
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                response.params[1].command.should.equal('Goodbye World');
                response.params.length.should.equal(2);
                done();
            });
    });

    it('List Actions', function(done) {
        controller
            .listAll()
            .then(function(response) {
                response.length.should.equal(1);
                done();
            });
    });

    it('Delete Action', function(done) {
        controller
            .remove(config.get('actionOne'))
            .then(function(response) {
                response.name.should.equal('actionOne');
                response.params[0].command.should.equal('Hello World');
                response.params[1].command.should.equal('Goodbye World');
                done();
            });
    });
});
