import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@environment': `${__dirname}/environment`,
});

import 'module-alias/register';
