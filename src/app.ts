import { initOrm, orm } from "./mikro-orm/orm";
import { Book } from "./entities/Book";
import { RequestContext } from "@mikro-orm/core";
import * as process from "process";
import { Author } from "./entities/Author";

async function request1() {
  const books = await orm.bookRepository.find(
    {},
    { populate: ["description", "title"] }
  );
  console.log("request-1-title: ", books[0].title);
  console.log("request-1-description: ", books[0].description);
}

async function request2() {
  const authors = await orm.authorRepository.find(
    {},
    { populate: ["books", "books.title", "books.description"] }
  );
  console.log("request-2-title: ", authors[0].books.getItems()[0].title);
  console.log(
    "request-2-description: ",
    authors[0].books.getItems()[0].description
  );
}

(async () => {
  try {
    let id = "";
    await initOrm();
    await RequestContext.createAsync(orm.entityManager, async () => {
      await orm.bookRepository.nativeDelete({});
      await orm.authorRepository.nativeDelete({});
      await orm.localizedStringRepository.nativeDelete({});
      const author = new Author();
      const book = new Book(author, "mikro-orm", "Book about mikro-orm");
      await orm.entityManager.persistAndFlush([book, author]);
      id = book.id;
    });

    await RequestContext.createAsync(orm.entityManager, async () => {
      await Promise.all([request1(), request2()]);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
