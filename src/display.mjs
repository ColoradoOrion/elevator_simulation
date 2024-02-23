import readline from 'readline';
import { Leg } from './leg.mjs';

export class Display {
    constructor() { }
    /**
     * 
     * @param {Leg} leg - The current leg
     * @param {*} total_travel_time - The total time in seconds that the car has been travelling.
     * @param {*} floors_visited - An array of floors that the elevator car has stopped at.
     * @returns A string display of the elevator car's direction, elapsed time, and floors visited
     */
    static get_output(leg, total_travel_time, floors_visited) {
        if(leg instanceof Leg)
        {
            return `${leg.get_indicator()}\tTime: ${total_travel_time}s\tFloors: ${floors_visited.join(', ')}`
        }
        else{
            return "Invalid leg";
        }
    }

    static print_output(car, total_travel_time, floors_visited) {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(Display.get_output(car, total_travel_time, floors_visited));
    }
}