import { initOrm, orm } from "./mikro-orm/orm";
import { Book } from "./entities/Book";
import { RequestContext } from "@mikro-orm/core";

async function request(id: number) {
  const books = await orm.bookRepository.find(
    {},
    { populate: ["description", "title"] }
  );
  console.log(`request-${id}-title: `, books[0].title);
  console.log(`request-${id}-description: `, books[0].description);
}

(async () => {
  try {
    await initOrm();
    await RequestContext.createAsync(orm.entityManager, async () => {
      await orm.bookRepository.nativeDelete({});
      await orm.localizedStringRepository.nativeDelete({});
      const book = new Book("mikro-orm", "Book about mikro-orm");
      await orm.entityManager.persistAndFlush(book);
    });

    await RequestContext.createAsync(orm.entityManager, async () => {
      await Promise.all([request(1), request(2)]);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
