
import { MyConfig } from './config.mjs';
import { Display  } from './display.mjs'; 
// state
// arriving
// departing
// travelling



//----------------------------------------------

let last_floor = 1;
const floors_to_visit = [3, 2, 8];
const floors_visited = [];
let total_travel_time = 0;

(async function run_simulation() {

    // Get config

    // Validate config
    //min < max

    // Validate inputs
    // floors are provided
    // split
    // floors are integers
    // floors are in bounds
    // start is an integer
    // start is in bounds

    floors_visited.push(last_floor);

    while (floors_to_visit.length) {

        const next_floor = floors_to_visit.shift();

        if (next_floor == last_floor) {
            continue;
        }

        // door time open/close

        // we reached the floor


        const next_direction = next_floor - last_floor;
        const indicator = next_direction > 0 ? " ^ " : " v ";

        let travel_time_remaining = Math.abs(next_floor - last_floor) * MyConfig.TimeBetweenFloors;

        while (travel_time_remaining > 0) {
            Display.print_output(last_floor, next_floor, total_travel_time, floors_visited);

            // check for keypress
            // stop

            await new Promise((resolve) => setTimeout(() => {
                resolve();
            }, 1000 * MyConfig.RunScale));

            ++total_travel_time;
            --travel_time_remaining;
        }

        last_floor = next_floor;

        floors_visited.push(last_floor);
        Display.print_output(last_floor, next_floor, total_travel_time, floors_visited);
    }

    // we've reached the last floor
    console.log("\nSimulation complete");
})();