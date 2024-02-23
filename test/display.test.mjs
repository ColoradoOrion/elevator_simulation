import { Display } from '../src/display.mjs';
import { assert } from 'chai';

describe('Display', function () {
    describe('Indicator', function () {
        it('should return " ^ " if the next floor is above the last floor', () => {

            const indicator = Display.get_indicator(1, 4);
            assert.equal(indicator, ' ^ ');
        });

        it('should return " v " if the next floor is below the last floor', () => {

            const indicator = Display.get_indicator(8, 4);
            assert.equal(indicator, ' v ');
        });

        it('should return " - " if the next floor is the same as the last floor', () => {

            const indicator = Display.get_indicator(8, 8);
            assert.equal(indicator, ' - ');
        });

        it('should return " ^ " if the next floor is above the last floor (negative)', () => {

            const indicator = Display.get_indicator(-5, 4);
            assert.equal(indicator, ' ^ ');
        });

        it('should return " v " if the next floor(negative) is below the last floor', () => {

            const indicator = Display.get_indicator(8, -16);
            assert.equal(indicator, ' v ');
        });
    });

    describe('Output', function () {
        it('should display no elapsed time and the initial floor', () => {
            const output = Display.get_output(1, 3, 0, []);
            assert.equal(output, ' ^ \tTime: 0s\tFloors: ');
        })

        it('should display no elapsed time and the initial floor', () => {
            const output = Display.get_output(1, 3, 2, [1]);
            assert.equal(output, ' ^ \tTime: 2s\tFloors: 1');
        })

        it('should display no elapsed time and the initial floor', () => {
            const output = Display.get_output(3, 2, 20, [1, 3]);
            assert.equal(output, ' v \tTime: 20s\tFloors: 1, 3');
        })

        it('should display no elapsed time and the initial floor', () => {
            const output = Display.get_output(7, 2, 300, [1, 3, 6, 12, 20, 14]);
            assert.equal(output, ' v \tTime: 300s\tFloors: 1, 3, 6, 12, 20, 14');
        })
    })
});