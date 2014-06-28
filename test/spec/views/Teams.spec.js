/*global beforeEach, describe, it, assert, expect  */
'use strict';
describe('Teams View', function () {

    beforeEach(function () {
		this.TeamsCollection = new WC.Collections.Teams();

        this.TeamsView = new WC.Views.Teams({ collection: this.TeamsCollection });
    });

	it('View was created', function () {
		expect(this.TeamsView).to.be.an('object');
	});

	it('View has template', function () {
		expect(this.TeamsView.template()).to.be.a('string');
	});
});
