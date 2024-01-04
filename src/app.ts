import { initOrm, orm } from "./mikro-orm/orm";
import { Book } from "./entities/Book";
import { RequestContext } from "@mikro-orm/core";
import * as process from "process";
import { Author } from "./entities/Author";
import { AuthorWithBook } from "./entities/AuthorWithBook";

async function initData() {
  await orm.entityManager.getRepository(Book).nativeDelete({});
  await orm.entityManager.getRepository(Author).nativeDelete({});

  const author1 = new Author("Author 1");
  const author2 = new Author("Author 2");

  const book1 = new Book("Book 1", author1);
  const book2 = new Book("Book 2", author1);
  const book3 = new Book("Book 3", author2);

  await orm.entityManager.persistAndFlush([
    author1,
    author2,
    book1,
    book2,
    book3,
  ]);
}

(async () => {
  try {
    await initOrm();
    await RequestContext.create(orm.entityManager, async () => {
      await initData();
    });
    await RequestContext.create(orm.entityManager, async () => {
      const authorWithBooks = await orm.entityManager.findAll(AuthorWithBook, {
        populate: ["book"],
      });
      console.log(authorWithBooks);
    });
    await RequestContext.create(orm.entityManager, async () => {
      const authorWithBooks = await orm.entityManager
        .createQueryBuilder(AuthorWithBook)
        .select("*")
        .getKnexQuery();
      console.log(authorWithBooks);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
