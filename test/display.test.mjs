import { Display } from '../src/display.mjs';
import { assert } from 'chai';

describe('Display', function () {
    describe('Indicator', function () {
        it('should return " ^ " if the next floor is above the last floor', function () {

            const indicator = Display.get_indicator(1, 4);
            assert.equal(indicator, ' ^ ');
        });

        it('should return " v " if the next floor is below the last floor', function () {

            const indicator = Display.get_indicator(8, 4);
            assert.equal(indicator, ' v ');
        });

        it('should return " - " if the next floor is the same as the last floor', function () {

            const indicator = Display.get_indicator(8, 8);
            assert.equal(indicator, ' - ');
        });

        it('should return " ^ " if the next floor is above the last floor (negative)', function () {

            const indicator = Display.get_indicator(-5, 4);
            assert.equal(indicator, ' ^ ');
        });

        it('should return " v " if the next floor(negative) is below the last floor', function () {

            const indicator = Display.get_indicator(8, -16);
            assert.equal(indicator, ' v ');
        });
    });

    describe('Output', function () {
        // no floors visited, no time

        // between 1st and next floor

        // 
    })
});