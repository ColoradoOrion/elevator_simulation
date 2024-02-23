import { MyConfig } from "./config.mjs";

/**
 * Describes an elevator car
 */
export class Car {

    /**
     * 
     * @param {Number} last_floor - The most recently departed floor
     * @param {Number} next_floor - The next floor the car will travel to
     * @param {MyConfig} config - Config parameters that includes time
     */
    constructor(last_floor, next_floor, config) {
        this.last_floor = last_floor;
        this.next_floor = next_floor;
        this.elapsed_seconds = 0;
        this.travel_seconds = Math.abs(this.next_floor - this.last_floor) * config.TimeBetweenFloors + config.DoorCloseTime + config.DoorOpenTime;
        this.door_closing_time = config.DoorCloseTime;
        this.door_opening = this.travel_seconds - config.DoorOpenTime;
    }

    /**
     * 
     * @returns true when the elevator car's doors are closing
     */
    is_door_closing() {
        return this.elapsed_seconds < this.door_closing_time;
    }

    /**
     * 
     * @returns true when the elevator car's doors are opening
     */
    is_door_opening() {
        return this.elapsed_seconds > this.door_opening;
    }

    /**
     * 
     * @returns true when the elevator has reached the floor. 
     * @description In practice, this will only be true after the last floor is reached
     */
    is_stopped() {
        return this.elapsed_seconds >= this.travel_seconds;
    }

    /**
     * 
     * @returns true if the elevator car is not opening/closing its doors and it's not stopped
     */
    is_travelling() {
        return !this.is_door_closing && !this.is_door_opening && !this.is_stopped;
    }

    get_total_travel_time_seconds() {
        return this.travel_seconds;
    }
}