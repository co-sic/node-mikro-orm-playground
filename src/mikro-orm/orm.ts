import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Book } from "../entities/Book";
import { LocalizedString } from "../entities/LocalizedString";

export const orm = {} as {
  orm: MikroORM;
  entityManager: EntityManager;
  bookRepository: EntityRepository<Book>;
  localizedStringRepository: EntityRepository<LocalizedString>;
};

export async function initOrm() {
  orm.orm = await MikroORM.init();
  orm.entityManager = orm.orm.em as EntityManager;
  orm.bookRepository = orm.entityManager.getRepository(Book);
  orm.localizedStringRepository =
    orm.entityManager.getRepository(LocalizedString);
  await orm.orm.getMigrator().up();
}
