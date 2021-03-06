import * as dotenv from 'dotenv';
import * as _ from 'lodash';

const result = dotenv.config();

let envs: any;

if(!('error' in result)) {
    envs = result.parsed;
} else {
    envs = {};
    _.each(process.env, (val, key) => {
        envs[key] = val;
    });
}

module.exports = envs;