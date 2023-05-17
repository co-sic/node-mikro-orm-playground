import {
  BaseEntity as MikroORMBaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import { LocalizedString } from "./LocalizedString";
import { Author } from "./Author";

@Entity()
export class Book extends MikroORMBaseEntity<Book, "id"> {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @ManyToOne()
  title: LocalizedString;

  @ManyToOne()
  description: LocalizedString | null;

  @ManyToOne()
  author: Author;

  constructor(author: Author, title: string, description: string) {
    super();
    this.author = author;
    this.title = new LocalizedString(title);
    this.description = new LocalizedString(description);
  }
}
