import {
  BaseEntity,
  Collection,
  Embedded,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/postgresql";
import { Book } from "./Book";
import { AuthorEmbeddable } from "./AuthorEmbeddable";

@Entity()
export class Author extends BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);

  @Embedded({ object: true })
  embeddable: AuthorEmbeddable;

  constructor(name: string, embeddable: AuthorEmbeddable) {
    super();
    this.name = name;
    this.embeddable = embeddable;
  }
}
