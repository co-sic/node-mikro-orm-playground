import { Constructor, MikroORM, Utils } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migration, Migrator } from '@mikro-orm/migrations';

export function getMigrator(orm: MikroORM<PostgreSqlDriver>) {
  const migrator: Migrator = orm.getMigrator();
  // @ts-ignore
  migrator.resolve = (params) => {
    // @ts-ignore
    const fileName = params.path.split('/').pop()!.split('.')[0];
    const createMigrationHandler = async (method: 'up' | 'down') => {
      const migration = await Utils.dynamicImport(params.path!);
      const MigrationClass = migration[fileName] as Constructor<Migration>;
      // @ts-ignore
      const instance = new MigrationClass(migrator.driver, migrator.config);

      // @ts-ignore
      await migrator.runner.run(instance, method);
    };

    return {
      // @ts-ignore
      name: migrator.storage.getMigrationName(params.name),
      up: () => createMigrationHandler('up'),
      down: () => createMigrationHandler('down'),
    };
  };
  return migrator;
}
