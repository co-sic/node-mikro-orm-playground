import { EntityManager, MikroORM } from "@mikro-orm/postgresql";

export const orm = {} as {
  orm: MikroORM;
  entityManager: EntityManager;
};

export async function initOrm() {
  orm.orm = await MikroORM.init();
  orm.entityManager = orm.orm.em;
  await orm.orm.getMigrator().up();
}
