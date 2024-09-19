import {initOrm, orm} from "./mikro-orm/orm";
import {Book} from "./entities/Book";
import {RequestContext} from "@mikro-orm/postgresql";
import * as process from "process";
import {Author} from "./entities/Author";
import {Publisher} from "./entities/Publisher";

async function initData() {
  await orm.entityManager.getRepository(Publisher).nativeDelete({});
  await orm.entityManager.getRepository(Book).nativeDelete({});
  await orm.entityManager.getRepository(Author).nativeDelete({});

  const author1 = new Author("Author 1");
  const book1 = new Book("Book 1", author1);
  const publisher1 = new Publisher("Publisher 1", author1);

  await orm.entityManager.persistAndFlush([
    publisher1,
    author1,
    book1,
  ]);
}

(async () => {
  try {
    await initOrm();
    await RequestContext.create(orm.entityManager, async () => {
      await initData();
    });
    await RequestContext.create(orm.entityManager, async () => {
      const author = await orm.entityManager.findOneOrFail(Author, {name: "Author 1"}, {fields: ["books"]});
      console.log(author.books.$.getItems()[0].title); // => Book 1
    });
     await RequestContext.create(orm.entityManager, async () => {
      const publisher = await orm.entityManager.findOneOrFail(Publisher, {name: "Publisher 1"}, {fields: ["owner"]});
      console.log(publisher.owner.$.name); // => undefined
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
