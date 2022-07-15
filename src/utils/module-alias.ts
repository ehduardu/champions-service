import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '@controllers': path.join(files, 'controllers'),
  '@infra': path.join(files, 'infra'),
  '@services': path.join(files, 'services'),
  '@providers': path.join(files, 'providers'),
  '@utils': path.join(files, 'utils'),
});