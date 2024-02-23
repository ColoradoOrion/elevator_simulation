# Elevator Simulation

This is an elevator simulation that times an elevator car as it travels between floors and keeps a record of the floors it visits.

## Pre requisites

* NodeJS

## Building
1. Clone the project locally
1. Install the dependencies with

       npm install

## Running the program
From the command prompt, run

    npm elevator.js floors=<floors> start=[starting floor = 1]

| Parameter | Default | Description |
|--------|-----------|---------|
| `floors` | *required* |  A comma-separated list of floors the elevator needs to visit |
| `starting floor` | 1 | The floor the car starts at. If omitted, the 1st floor is assumed |

Pressing any key will abort the simulation.

### Output

    <indicator> Time: <elapsed travel time>s Floors: <floors visited>

| Output | Description |
|--------|-----------|
| Indicator `[]` |  Doors closing |
| Indicator `[ ]` | Doors opening |
| Indicator `^` | Car climbing |
| Indicator `v` | Car descending |
| Indicator `-` | Car stopped |
| `elapsed travel time` | The travel time of the elevator car in seconds |
| `floors visited` | A comma-separated list of floors that the elevator car has stopped at |

## Assumptions
- The "simulation" is a real time elevator experience i.e. we are not simply calculating the time travelled and displaying a list of floors visited.
- Time between floors is 10 seconds.
- The Total elapsed time display is in seconds.
    - Even with the time configurable, it is assumed that between-floor time would be in an even second increment e.g., 8 seconds and not 8.2 seconds.
- Floors must be specified numerically.
- The starting floor is the first value listed in the "Floors" display.
- If no starting floor is provided, the 1st floor is assumed.
- Max and min floors are defined in the config. Entering floors above or below the bounds will fail the simluation.
- Negative floors are okay as long as they're in bounds.
    - Floor 1 is assumed to be the ground floor.
    - Negative floors are assumed to be subterranean.
    - The zero floor is probably the first basement floor. I'm trying not to overthink this.
- It takes 4 seconds for the doors to close before the car departs from a stop.
- It takes 4 seconds for the doors to open after the car arrives at a stop.
- The doors are assumed to be opened at the beginning and end of the simulation.
- Floors can be visited more than once.
- If the same floor is provided consecutively, zero time is assumed. i.e. The doors do not open and close. Subsequent identical floors are essentially skipped.
- The elevator car accelerates to its top speed and comes to a stop instantaneously.
- Passengers embark and disembark instantaneously.

## Features that were not implemented
- Time for passengers to embark and disembark. This is stubbed with a time of zero seconds.
- Realtime car location. Based on the requirements, the output only displays the floors the car stops at as it arrives at each one.
- Summoning the elevator from another floor.
- Acceleration and desceleration of the elevator car as it arrives/departs. In a more precise simulation, the car will descelerate as it approaches and accelerates as it departs from each stop.
- Allowing floors to be defined with characters such as "L" (lobby), "B" (basement), "G" (garage), etc.
- Varying speed of the elevator as it's affected by weight.
- The ability to [stop between floors](https://en.wikipedia.org/wiki/Being_John_Malkovich).
- Elevator music.