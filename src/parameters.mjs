import { MyConfig } from "./config.mjs";

export class Parameters {
    static TooFewArraysException = 'Please provide at least the "floors" parameter';
    static InvalidConfigException = "Please pass a valid config value";
    static InvalidConfigBoundariesException = "Ensure that the configurations MinFloor is less than or equal to the MaxFloor";
    static InvalidParameterException = 'Please pass parameters in name=value format';
    static InvalidFloorException = 'Please provide numerical floors';
    static NoFloorsProvidedException = 'Please provide the "floors" parameter';

    static parse_args(argv, config) {
        const floors_to_visit = [];
        let starting_floor = 1;

        if (argv.length < 3) {
            throw Parameters.TooFewArraysException;
        }

        if (config instanceof MyConfig == false) {
            throw Parameters.InvalidConfigException;
        }

        if (config.MinFloor > config.MaxFloor) {
            throw Parameters.InvalidConfigBoundariesException;
        }

        let floors_provided = false;
        
        for (let a = 2; a < argv.length; ++a) {
            const parts = argv[a].split("=");
            if (parts.length < 2) {
                throw Parameters.InvalidParameterException;
            }

            switch (parts[0].toLocaleLowerCase()) {
                case "floors":
                    const raw_floors_to_visit = parts[1].split(',');
                    for (let f of raw_floors_to_visit) {
                        const floor = parseInt(f);
                        if (Number.isNaN(floor)) {
                            throw Parameters.InvalidFloorException;
                        } else if (floor > config.MaxFloor || floor < config.MinFloor) {
                            throw (`Please provide floor values between ${config.MinFloor} and ${config.MaxFloor} inclusive. Provided: ${floor}`);
                        }

                        floors_to_visit.push(floor);
                    }
                    floors_provided = true;
                    break;
                case "start":
                    starting_floor = parseInt(parts[1]);
                    if (Number.isNaN(starting_floor)) {
                        throw 'The starting floor must be numeric'
                    } else if (starting_floor > config.MaxFloor || starting_floor < config.MinFloor) {
                        throw (`Please provide a starting floor value between ${config.MinFloor} and ${config.MaxFloor} inclusive. Provided: ${starting_floor}`);
                    }
                    break;
            }

            if(!floors_provided){
                throw Parameters.NoFloorsProvidedException;
            }
        }

        return [starting_floor, floors_to_visit];
    }
}