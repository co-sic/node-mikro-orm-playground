import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Author } from "./Author";
import { ManyToOne } from "@mikro-orm/postgresql";

@Entity()
export class Book extends BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  title: string;

  @ManyToOne()
  author: Author;

  constructor(title: string, author: Author) {
    super();
    this.title = title;
    this.author = author;
  }
}
