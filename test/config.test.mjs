import { MyConfig } from '../src/config.mjs';
import { assert } from 'chai';

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {

            const config = new MyConfig();
            assert.isTrue(config.works());
        });
    });
});