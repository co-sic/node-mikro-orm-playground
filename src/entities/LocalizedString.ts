import {
  Entity,
  PrimaryKey,
  Property,
  BaseEntity as MikroORMBaseEntity,
} from "@mikro-orm/core";

@Entity()
export class LocalizedString extends MikroORMBaseEntity<LocalizedString, "id"> {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  de_DE: string;

  @Property()
  en_US?: string;

  constructor(de: string) {
    super();
    this.de_DE = de;
  }
}
