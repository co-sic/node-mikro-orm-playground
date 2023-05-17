import {
  BaseEntity as MikroORMBaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import { LocalizedString } from "./LocalizedString";

@Entity()
export class Book extends MikroORMBaseEntity<Book, "id"> {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @ManyToOne()
  title: LocalizedString;

  @ManyToOne()
  description: LocalizedString | null;

  constructor(title: string, description: string) {
    super();
    this.title = new LocalizedString(title);
    this.description = new LocalizedString(description);
  }
}
