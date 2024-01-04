import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import {
  Collection,
  EntityManager,
  OneToMany,
  OneToOne,
} from "@mikro-orm/postgresql";
import { Book } from "./Book";

@Entity({
  expression: (em: EntityManager) =>
    em
      .getKnex()
      .select("a.*", "b.id as book_id")
      .from("author as a")
      .leftJoin("book as b", "a.id", "b.author_id"),
})
export class AuthorWithBook {
  @Property()
  id!: string;

  @Property()
  name!: string;

  @OneToOne()
  book!: Book;
}
