import { Leg } from '../src/leg.mjs';
import { MyConfig } from '../src/config.mjs';
import { Display } from '../src/display.mjs';
import { assert } from 'chai';

const config = new MyConfig();

describe('Display', () => {
    
    describe('Output', () => {
        it('should display no elapsed time and the initial floor', () => {
            const leg = new Leg(1, 3, config);
            const output = Display.get_output(leg, 0, []);
            assert.equal(output, '> <\tTime: 0s\tFloors: ');
        })

        it('should display ellapsed time and starting floor immediately after departure', () => {
            const leg = new Leg(1, 3, config);
            leg.increment(5);

            const output = Display.get_output(leg, 5, [1]);
            assert.equal(output, ' ^ \tTime: 5s\tFloors: 1');
        })

        it('should display new floor visted once the next floor is reached', () => {
            const leg = new Leg(3, 2, config);
            leg.increment(5);
            const output = Display.get_output(leg, 20, [1, 3]);
            assert.equal(output, ' v \tTime: 20s\tFloors: 1, 3');
        })

        it('should display all floors visted', () => {
            const leg = new Leg(7, 2, config);
            leg.increment(5);
            const output = Display.get_output(leg, 300, [1, 3, 6, 12, 20, 14]);
            assert.equal(output, ' v \tTime: 300s\tFloors: 1, 3, 6, 12, 20, 14');
        })
    })
});