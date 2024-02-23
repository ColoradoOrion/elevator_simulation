import { Car } from '../src/car.mjs'
import { assert, expect } from 'chai';
import { MyConfig } from '../src/config.mjs';

describe('Display', () => {

    const config = new MyConfig();

    describe('Car construction', () => {
        it('should throw an exception if an array is not provided', () => {
            expect(() => {
                new Car(1, "Not an array", config);
            }).to.throw(Car.InvalidFloorsException);
        })

        it('should throw an exception if a proper MyConfig is not provided', () => {
            expect(() => {
                new Car(1, [1, 2, 3], "Not a Config");
            }).to.throw(Car.InvalidConfigExcpetion);
        })
    })

    describe('Itinerary', () => {
        it ('should have a journey of no time if an empty array of floors is provided', () => {
            const car = new Car(1, [], config);
            car.run();
            assert.equal(car.get_total_travel_time(), 0);
         //   expect(car.get_floors_visited).to.eql([1]);
        })
    })
})