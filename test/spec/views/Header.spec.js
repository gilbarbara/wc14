/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('Header View', function () {

    beforeEach(function () {
        this.HeaderView = new WC.Views.Header();
    });

	it('View was created', function () {
		expect(this.HeaderView).to.be.an('object');
	});

	it('View has template', function () {
		expect(this.HeaderView.template()).to.be.a('string');
	});

});
