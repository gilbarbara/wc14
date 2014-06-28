/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('Teams Collection', function () {

    before(function (done) {
		var that = this;
		WC.buildData();

		WC.ready.done(function () {
			that.TeamsCollection = new WC.Collections.Teams(WC.data.teams);
			done();
		});


    });

	it('Collection was created', function () {
		expect(this.TeamsCollection).to.be.an('object');
	});

	it('Collection can fetch initial data', function () {
		var collection = this.TeamsCollection;
		expect(collection.size()).to.equal(32);
	});

});
