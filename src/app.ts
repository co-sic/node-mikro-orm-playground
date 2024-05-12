import { initOrm, orm } from "./mikro-orm/orm";
import { RequestContext } from "@mikro-orm/postgresql";
import * as process from "process";
import { Author } from "./entities/Author";
import { Book } from "./entities/Book";

(async () => {
  try {
    await initOrm();
    await RequestContext.create(orm.entityManager, async () => {
      // This works
      const authors = await orm.entityManager.find(
        Author,
        {},
        { orderBy: [{ embeddable: { age: "ASC" } }] }
      );
      console.log(authors);
    });
    await RequestContext.create(orm.entityManager, async () => {
      // This throws "column b0.embeddable_age does not exist"
      const books = await orm.entityManager.find(
        Book,
        {},
        { orderBy: [{ author: { embeddable: { age: "ASC" } } }] }
      );
      console.log(books);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
