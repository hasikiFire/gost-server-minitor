import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configFileNameObj = {
  development_local: 'dev_local',
  development: 'dev',
  test: 'test',
  production: 'prod',
};

const env = process.env.NODE_ENV;

export default () => {
  const path = join(__dirname, `${configFileNameObj[env]}.yaml`);
  return yaml.load(readFileSync(path, 'utf8')) as Record<string, any>;
};
