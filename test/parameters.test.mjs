import { Parameters } from "../src/parameters.mjs";
import { MyConfig } from "../src/config.mjs";
import { expect, assert } from 'chai';

const config = new MyConfig();

describe('Parameters', () => {
    describe('validate', () => {
        it('should ensure that at least the floor argument is provided', () => {
            expect(() => {
                Parameters.parse_args([], config);
            }).to.throw(Parameters.TooFewArraysException);
        })

        it('should throw if config is not a valid MyConfig instance', () => {
            expect(() => {
                Parameters.parse_args(["one", "two", "three"], null)
            }).to.throw(Parameters.InvalidConfigException);

        })

        it('should check that the config boundaries are okay', () => {
            expect(() => {
                const thisConfig = new MyConfig();
                thisConfig.MaxFloor = 2;
                thisConfig.MinFloor = 5;
                Parameters.parse_args(["one", "two", "three"], thisConfig)
            }).to.throw(Parameters.InvalidConfigBoundariesException);
        })

        it('should throw if parameters are not name=value', () => {
            expect(() => {
                Parameters.parse_args(["first", "second", "floor", "start=1"], config)
            }).to.throw(Parameters.InvalidParameterException)
        })

        it('should throw if floor is not numeric', () => {
            expect(() => {
                Parameters.parse_args(["first", "second", "floor", "start=1"], config)
            }).to.throw(Parameters.InvalidParameterException)
        })

        it('should parse floors in comma-separated and default start to 1', () => {
            let start_floor, floors_to_visit;

            [start_floor, floors_to_visit] = Parameters.parse_args(["first", "second", "floors=4,5,6"], config);

            expect(floors_to_visit).to.eql([4, 5, 6]);
        })

        it('should parse floors in comma-separated and set start if provided', () => {
            let start_floor, floors_to_visit;

            [start_floor, floors_to_visit] = Parameters.parse_args(["first", "second", "floors=4,5,6", "start=13"], config);

            expect(floors_to_visit).to.eql([4, 5, 6]);
            assert.equal(start_floor, 13);
        })

        it('should throw if the "floors" parameter is not provided', () => {
            expect(() => {
                Parameters.parse_args(["first", "second", "notFloors=4,5,6", "start=1"], config)
            }).to.throw(Parameters.NoFloorsProvidedException)
        })
        // TODO: check for bounds
    })
})