import {BaseEntity, Entity, ManyToOne, PrimaryKey, Property, ref, Ref,} from "@mikro-orm/postgresql";
import {Author} from "./Author";

@Entity()
export class Book extends BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  title: string;

  @ManyToOne()
  author: Ref<Author>;

  constructor(title: string, author: Author) {
    super();
    this.title = title;
    this.author = ref(author);
  }
}
