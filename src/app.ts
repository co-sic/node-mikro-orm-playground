import { initOrm, orm } from "./mikro-orm/orm";
import { Book } from "./entities/Book";
import { RequestContext } from "@mikro-orm/postgresql";
import * as process from "process";
import { Author } from "./entities/Author";
import { Publisher } from "./entities/Publisher";

async function initData() {
  await orm.entityManager.getRepository(Publisher).nativeDelete({});
  await orm.entityManager.getRepository(Book).nativeDelete({});
  await orm.entityManager.getRepository(Author).nativeDelete({});

  const author1 = new Author("Author 1");
  const author2 = new Author("Author 2");

  const book1 = new Book("Book 1", author1);
  const book2 = new Book("Book 2", author1);
  const book3 = new Book("Book 3", author2);

  const publisher1 = new Publisher("Publisher 1", author1);
  const publisher2 = new Publisher("Publisher 2", author2);

  await orm.entityManager.persistAndFlush([
    publisher1,
    publisher2,
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
      const authors = await orm.entityManager.find(Author, {
        books: {
          $some: {
            title: "Book 2",
          },
        },
      });
      console.log(authors);
    });
    await RequestContext.create(orm.entityManager, async () => {
      const publishers = await orm.entityManager.find(Publisher, {
        owner: {
          books: {
            $some: {
              title: "Book 2",
            },
          },
        },
      });
      console.log(publishers);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
