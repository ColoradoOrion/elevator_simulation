import { Leg } from "../src/leg.mjs";
import { MyConfig } from "../src/config.mjs";
import { assert } from 'chai';

const config = new MyConfig();

describe('Leg', () => {
    describe('Floors', () => {
        it('should show the last floor visted and the next floor to travel to', () => {
            const LastFloor = 1;
            const NextFloor = 4;
            const leg = new Leg(LastFloor, NextFloor, config);
            assert.equal(leg.get_last_floor(), LastFloor);
            assert.equal(leg.get_next_floor(), NextFloor);
        })
    })

    describe('Doors', () => {
        it('should have closing doors initially', () => {
            const leg = new Leg(1, 3, config);
            assert.isTrue(leg.is_door_closing());
        })

        it('should show doors are closing for the first "config.DoorOpenTime" seconds', () => {
            const leg = new Leg(1, 3, config);
            for (let second = 0; second < config.DoorCloseTime + 2; ++second) {

                if (second < config.DoorCloseTime) {
                    assert.isTrue(leg.is_door_closing(), `In Close time: ${second} vs. config of ${config.DoorCloseTime}. Elapsed is ${leg.get_elapsed_time()}`);
                } else {
                    assert.isFalse(leg.is_door_closing(), `Past close time: ${second} vs. config of ${config.DoorCloseTime}. Elapsed is ${leg.get_elapsed_time()}`);
                }

                leg.increment();
            }
        })

        it('should show doors are opening for the last "config.DoorCloseTime" seconds', () => {
            const leg = new Leg(1, 2, config);
            for (let second = 0; second < leg.get_journey_time(); ++second) {

                if (second >= leg.get_journey_time() - config.DoorOpenTime) {
                    assert.isTrue(leg.is_door_opening(), `In Open time: ${second} vs. config of ${config.DoorOpenTime}. Elapsed is ${leg.get_elapsed_time()}`);
                } else {
                    assert.isFalse(leg.is_door_opening(), `Before open time: ${second} vs. config of ${config.DoorOpenTime}. Elapsed is ${leg.get_elapsed_time()}`);
                }

                leg.increment();
            }
        })
    })

    describe('Motion', () => {
        it('should have travel = sum of door_open + 10 sec/floor + door_close', () => {
            const leg = new Leg(1, 2, config);
            assert.equal(leg.get_journey_time(), config.DoorCloseTime + config.DoorOpenTime + config.TimeBetweenFloors);
        })

        it('should increment 1 second if no value is passed for "seconds"', () => {
            const leg = new Leg(1, 2, config);
            leg.increment();

            assert.equal(leg.get_elapsed_time(), 1);
        })

        it('should increment s "seconds" when s is specified', () => {
            const leg = new Leg(1, 2, config);
            leg.increment(6);

            assert.equal(leg.get_elapsed_time(), 6);
        })

        it('should show the car travelling between doors open/close', () => {
            const leg = new Leg(1, 2, config);
            for (let second = 0; second < leg.get_journey_time(); ++second) {

                if (leg.is_door_closing() || leg.is_door_opening()) {
                    assert.isFalse(leg.is_travelling(), `Doors moving. Time: ${second}`);
                } else {
                    assert.isTrue(leg.is_travelling(), `Doors not moving. Time: ${second}`);
                }

                leg.increment();
            }


        })

        it('should show the car stopped at the end of the journey', () => {
            const leg = new Leg(1, 2, config);
            for (let second = 0; second < leg.get_journey_time(); ++second) {

                assert.isFalse(leg.leg_complete(), `In progress. Time: ${second}`);

                leg.increment();
            }

            assert.isTrue(leg.leg_complete());
        })

        it('should show a zero time remaining even with a large elapsed time', () => {
            const leg = new Leg(1, 2, config);
            leg.increment(1000);
            assert.equal(leg.get_remaining_seconds(), 0);
        })
    })

    describe('Indicator', () => {
        it('should return "> <" before the car starts moving', () => {
            const leg = new Leg(1, 4, config);
            assert.equal(leg.get_indicator(), '> <');
        });

        it('should return "< >" as the car reaches the floor', () => {
            const leg = new Leg(1, 2, config);
            leg.increment(16);
            assert.equal(leg.get_indicator(), '< >');
        });

        it('should return "[ ]" if the start and end floor are the same', () => {
            const leg = new Leg(1, 1, config);
            assert.equal(leg.get_indicator(), "[ ]");
        })

        it('should return " ^ " if the next floor is above the last floor', () => {
            const leg = new Leg(1, 4, config);
            leg.increment(5);
            assert.equal(leg.get_indicator(), ' ^ ');
        });

        it('should return " v " if the next floor is below the last floor', () => {

            const leg = new Leg(8, 4, config);
            leg.increment(5);
            assert.equal(leg.get_indicator(), ' v ');
        });

        it('should return " ^ " if the next floor is above the last floor (negative)', () => {

            const leg = new Leg(-5, 4, config);
            leg.increment(5);
            assert.equal(leg.get_indicator(), ' ^ ');
        });

        it('should return " v " if the next floor(negative) is below the last floor', () => {

            const leg = new Leg(8, -16, config);
            leg.increment(5);
            assert.equal(leg.get_indicator(), ' v ');
        });
    });
})