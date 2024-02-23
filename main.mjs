
import { MyConfig } from './src/config.mjs';

import keypress from 'keypress';
import { Car } from './src/car.mjs';
import { Parameters } from './src/parameters.mjs';

// This allows us to abort the simulation when it's running
keypress(process.stdin);

const config = new MyConfig();

function show_usage() {
    console.log("Usage: main.js floors=<floors> start=[starting floor = 1]\nSee README.md\n");
    process.exit();
}

(async function run_simulation() {

    try {

        let starting_floor, floors_to_visit;
        [starting_floor, floors_to_visit] = Parameters.parse_args(process.argv, config);

        process.stdin.on('keypress', (ch, key) => {
            console.log('\nAborting simulation...');
            process.exit();
        });
        if (process.stdin.isTTY) { // This setRawMode() doesn't run in debug mode
            process.stdin.setRawMode(true); // don't wait for Enter
        }

        process.stdin.resume();

        console.log("Simulation in progress. Press any key to abort");

        const car = new Car(starting_floor, floors_to_visit, config);
        await car.run();

        console.log("\nSimulation complete");
    } catch (ex) {
        console.error(ex);
        show_usage();
    } finally {
        // This stops us from waiting for a keypress so we can end cleanly
        process.stdin.pause();
    }
})();