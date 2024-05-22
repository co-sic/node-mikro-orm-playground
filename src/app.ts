import { initOrm, orm } from "./mikro-orm/orm";
import { Book } from "./entities/Book";
import { RequestContext } from "@mikro-orm/postgresql";
import * as process from "process";
import { Author } from "./entities/Author";

async function initData() {
  await orm.entityManager.getRepository(Book).nativeDelete({});
  await orm.entityManager.getRepository(Author).nativeDelete({});

  const author1 = new Author("Author 1");
  const book1 = new Book("Book 1", author1);
  const book2 = new Book("Book 2", author1);

  const author2 = new Author("Author 2");
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
      /** Works */
      const authors1 = await orm.entityManager.find(Author, {
        books: {
          $some: {
            $or: [{ title: "Book 1" }, { title: "Book 2" }],
          },
        },
      });
      console.log(authors1.map((author) => author.name)); //[ 'Author 1' ]

      /** Works */
      const authors2 = await orm.entityManager.find(Author, {
        books: {
          $some: {
            $and: [{ title: "Book 1" }],
          },
        },
      });
      console.log(authors2.map((author) => author.name)); //[ 'Author 1' ]

      /** Fails */
      const authors3 = await orm.entityManager.find(Author, {
        books: {
          $some: {
            $and: [{ $or: [{ title: "Book 1" }, { title: "Book 2" }] }],
          },
        },
      });
      console.log(authors3.map((author) => author.name)); //[ 'Author 2', 'Author 1' ]
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
