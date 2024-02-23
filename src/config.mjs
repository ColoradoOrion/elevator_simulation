/**
 * This would ordinarily be done using a .env file/ENVIRONMENT_VARIABLES
 */
export class MyConfig {
    constructor() {  }

    MaxFloor = 100;
    MinFloor = -1;
    DoorCloseTime = 4;
    DoorOpenTime = 4;

    TimeBetweenFloors = 10;

    /**
     * Adjust the perceived time
     * 1 = real time
     * 0.5 = half speed
     * 2 = double speed
     * 
     * The slowest allowed is 0.5 speed (twice as slow as real time)
     */
    static TimeScale = 1; 
}