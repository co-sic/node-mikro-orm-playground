import {
  BaseEntity as MikroORMBaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
} from "@mikro-orm/core";
import { Book } from "./Book";

@Entity()
export class Author extends MikroORMBaseEntity<Author, "id"> {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);
  constructor() {
    super();
  }
}
