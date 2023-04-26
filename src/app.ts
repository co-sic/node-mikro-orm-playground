import {initOrm, orm} from './mikro-orm/orm';
import {Book} from "./entities/Book";
import {CalendarDate} from "calendar-date";
import {RequestContext} from "@mikro-orm/core";
import * as process from "process";

(async () => {
  try {
    await initOrm();
    await RequestContext.createAsync(orm.entityManager, async () => {
      await orm.bookRepository.nativeDelete({});
      const book = new Book(CalendarDate.nowLocal());
      await orm.bookRepository.persistAndFlush(book);
    });

    await RequestContext.createAsync(orm.entityManager, async () => {
      const books = await orm.bookRepository.findAll();
      console.log(`books found: ${books.length}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
})();
