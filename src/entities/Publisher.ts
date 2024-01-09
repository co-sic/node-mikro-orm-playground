import {
  BaseEntity,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/postgresql";
import { Author } from "./Author";

@Entity()
export class Publisher extends BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name: string;

  @OneToOne()
  owner: Author;

  constructor(name: string, owner: Author) {
    super();
    this.name = name;
    this.owner = owner;
  }
}
