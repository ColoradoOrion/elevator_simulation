import readline from 'readline';

export class Display {
    constructor() { }

    /**
     * 
     * @param {*} last_floor - The last floor at which the elevator car stopped.
     * @param {*} next_floor - The next destination floor of the elevator car.
     * @returns A string representation of the current direction of the elevator car.
     */
    static get_indicator(last_floor, next_floor) {
        if (last_floor < next_floor) {
            return ' ^ ';
        } else if (last_floor > next_floor) {
            return ' v ';
        } else {
            return " - ";
        }
    }

    /**
     * 
     * @param {*} last_floor - The last floor at which the elevator car stopped.
     * @param {*} next_floor - The next destination floor of the elevator car.
     * @param {*} total_travel_time - The total time in seconds that the car has been travelling.
     * @param {*} floors_visited - An array of floors that the elevator car has stopped at.
     * @returns A string display of the elevator car's direction, elapsed time, and floors visited
     */
    static get_output(last_floor, next_floor, total_travel_time, floors_visited) {
        const indicator = Display.get_indicator(last_floor, next_floor);
        return `${indicator} time: ${total_travel_time}s\tfloors: ${floors_visited.join(', ')}`
    }

    static print_output(last_floor, next_floor, total_travel_time, floors_visited) {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(Display.get_output(last_floor, next_floor, total_travel_time, floors_visited));
    }
}