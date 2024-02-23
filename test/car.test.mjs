import { Car } from "../src/car.mjs";
import { MyConfig } from "../src/config.mjs";
import { assert } from 'chai';

const config = new MyConfig();

describe('Car', () => {
    describe('Motion', () => {
        it('should have door_open + 10 sec/floor + door_close time for travel', () => {
            const car = new Car(1, 2, config);
            assert.equal(car.get_total_travel_time_seconds(), config.DoorCloseTime + config.DoorOpenTime + config.TimeBetweenFloors);
        })

        it('should have closing doors initially', () => {
            const car = new Car(1, 3, config);
            assert.isTrue(car.is_door_closing());
        })
    })

})