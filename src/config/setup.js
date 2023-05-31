import {
  devENV, prodENV, testENV, stagingENV,
} from './env';

const { EIGHT_MEDICALS_NODE_ENV: NODE_ENV } = process.env;

export default {
  test: testENV,
  production: prodENV,
  development: devENV,
  staging: stagingENV,
}[NODE_ENV || 'development'];
