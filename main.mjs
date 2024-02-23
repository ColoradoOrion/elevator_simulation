
import { MyConfig } from './src/config.mjs';

import keypress from 'keypress';
import { Car } from './src/car.mjs';

// This allows us to abort the simulation when it's running
keypress(process.stdin);

let starting_floor = 1;
const floors_to_visit = [2, 3, 2];
const config = new MyConfig();

(async function run_simulation() {

    try {
        // TODO instructions on run, including abort instructions

        process.stdin.on('keypress', (ch, key) => {
            console.log('\nAborting simulation...');
            process.exit();
        });
        if (process.stdin.isTTY) {
            // This won't run in debug mode
            process.stdin.setRawMode(true);
        }

        process.stdin.resume();
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

        const car = new Car(starting_floor, floors_to_visit, config);
        await car.run();

        console.log("\nSimulation complete");
    } catch (ex) {
        console.error(ex);
    } finally {
        // This stops us from waiting for a keypress so we can end cleanly
        process.stdin.pause();
    }
})();