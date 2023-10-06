import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Book } from "../entities/Book";
import { LocalizedString } from "../entities/LocalizedString";
import { config } from "../mikro-orm.config";
import { getMigrator } from "./migrator";

export const orm = {} as {
  orm: MikroORM<PostgreSqlDriver>;
  entityManager: EntityManager;
  bookRepository: EntityRepository<Book>;
  localizedStringRepository: EntityRepository<LocalizedString>;
};

export async function initOrm() {
  orm.orm = await MikroORM.init(config);
  orm.entityManager = orm.orm.em as EntityManager;
  orm.bookRepository = orm.entityManager.getRepository(Book);
  orm.localizedStringRepository =
    orm.entityManager.getRepository(LocalizedString);
  await getMigrator(orm.orm).up();
}
