import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Collection, OneToMany } from "@mikro-orm/postgresql";
import { Book } from "./Book";

@Entity()
export class Author extends BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
