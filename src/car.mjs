import { MyConfig } from "./config.mjs";
import { Leg } from "./leg.mjs";
import { Display } from "./display.mjs";
/**
 * Describes an elevator car
 */
export class Car {

    static InvalidFloorsException = "Please provide a valid array of floors to travel to";
    static InvalidConfigExcpetion = "Please provide a valid configuration";

    constructor(current_floor, floors_to_visit, config) {

        if (!Array.isArray(floors_to_visit)) {
            throw Car.InvalidFloorsException;
        }

        if (config instanceof MyConfig == false) {
            throw Car.InvalidConfigExcpetion;
        }

        this._floors_visited = [];
        this._floors_to_visit = floors_to_visit;
        this._last_floor = current_floor;
        this._total_travel_time = 0;
        this._config = config;
    }

    async run() {

        this._floors_visited.push(this._last_floor);

        if (Array.isArray(this._floors_to_visit)) {

            if (this._floors_to_visit.length == 0) {
                // Edge case where no destination floors are provided
                const leg = new Leg(this._last_floor, this._last_floor, this._config);
                Display.print_output(leg, 0, this._floors_visited);
            } else {
                // This allows us to simulate the time taken without actually having to wait in real time
                const sleep = 1000 / Math.max(0.5, MyConfig.TimeScale);

                while (this._floors_to_visit.length) {
                    // We're headed to a new floor
                    const next_floor = this._floors_to_visit.shift();
                    if (next_floor == this._last_floor) {
                        continue;

                    }
                    const leg = new Leg(this._last_floor, next_floor, this._config);
                    this.change_passengers();

                    // A loop with a small sleep allows us to monitor progress
                    // without having to wait for the car to reach a floor.
                    while (leg.get_remaining_seconds() > 0) {
                        Display.print_output(leg, this._total_travel_time, this._floors_visited);

                        await new Promise((resolve) => setTimeout(() => {
                            resolve();
                        }, sleep));

                        leg.increment();
                        ++this._total_travel_time;
                    }

                    // Capture the arrival
                    this._last_floor = next_floor;
                    this._floors_visited.push(this._last_floor);
                    Display.print_output(leg, this._total_travel_time, this._floors_visited);
                }
            }
        }
    }

    get_total_travel_time() {
        return this._total_travel_time;
    }

    get_floors_visited() {
        return this._floors_visited();
    }

    change_passengers() {
        // currently a no-op
    }
}

// TODO: check empty floors array
// start to one floor which is the same