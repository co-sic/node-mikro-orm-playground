import { MikroORM } from '@mikro-orm/core';
import { config } from '../../src/mikro-orm.config';
import { getMigrator } from '../../src/mikro-orm/migrator';

(async () => {
  try {
    const orm = await MikroORM.init(config);
    await getMigrator(orm).createMigration();
  } catch (err) {
    console.error(err);
  }

  process.exit();
})();
