import { MyConfig } from "./config.mjs";

/**
 * Describes the elevator car's trip between two floors
 */
export class Leg {

    /**
     * 
     * @param {Number} last_floor - The most recently departed floor
     * @param {Number} next_floor - The next floor the car will travel to
     * @param {MyConfig} config - Config parameters that includes time values
     */
    constructor(last_floor, next_floor, config) {
        this.last_floor = last_floor;
        this.next_floor = next_floor;
        this.elapsed_seconds = 0;

        const travel_time = Math.abs(this.next_floor - this.last_floor) * config.TimeBetweenFloors;
        this.journey_time = travel_time > 0 ? travel_time + config.DoorCloseTime + config.DoorOpenTime : 0;
        this.door_closing_time = config.DoorCloseTime;
        this.door_opening_time = config.DoorOpenTime;
    }

    get_next_floor() {
        return this.next_floor;
    }

    get_last_floor() {
        return this.last_floor;
    }

    /**
     * 
     * @returns true when the elevator car's doors are closing
     */
    is_door_closing() {
        return this.journey_time > 0 && this.elapsed_seconds <= this.door_closing_time;
    }

    /**
     * 
     * @returns true when the elevator car's doors are opening
     */
    is_door_opening() {
        return this.journey_time > 0 && this.journey_time - this.elapsed_seconds <= this.door_opening_time;
    }

    /**
     * 
     * @returns true when the elevator has reached the floor. 
     * @description In practice, this will only be true after the last floor is reached
     */
    leg_complete() {
        return this.elapsed_seconds >= this.journey_time;
    }

    /**
     * 
     * @returns true if the elevator car is not opening/closing its doors and it's not stopped
     */
    is_travelling() {
        return !this.is_door_closing() && !this.is_door_opening() && !this.leg_complete();
    }

    get_elapsed_time() {
        return this.elapsed_seconds;
    }

    get_journey_time() {
        return this.journey_time;
    }

    get_remaining_seconds() {
        return Math.max(0, this.journey_time - this.elapsed_seconds);
    }

    increment(seconds) {
        this.elapsed_seconds += seconds ?? 1;
    }

    get_indicator() {
        if (this.is_travelling()) {
            if (this.next_floor > this.last_floor) {
                return ' ^ ';
            } else if (this.next_floor < this.last_floor) {
                return ' v ';
            }
        } if (this.is_door_closing()) {
            return ' ><';
        } else if (this.is_door_opening()) {
            return '< >';
        } else {
            return '[ ]';
        }
    }
}