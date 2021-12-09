import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import {Book} from "../entities/Book";

export const orm = {} as {
  orm: MikroORM;
  entityManager: EntityManager;
  bookRepository: EntityRepository<Book>;
};

export async function initOrm() {
  orm.orm = await MikroORM.init();
  orm.entityManager = orm.orm.em;
  orm.bookRepository = orm.entityManager.getRepository(Book);
  await orm.orm.getMigrator().up();
}
