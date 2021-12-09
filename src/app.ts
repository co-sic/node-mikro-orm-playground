import {initOrm, orm} from './mikro-orm/orm';
import {Book} from "./entities/Book";

(async () => {

  await initOrm();
  const book = new Book([1,10,100,1000,2000]);
  await orm.bookRepository.persistAndFlush(book);

})();
