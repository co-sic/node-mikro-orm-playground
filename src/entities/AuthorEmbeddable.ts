import { Embeddable, Property } from "@mikro-orm/postgresql";

@Embeddable()
export class AuthorEmbeddable {
  @Property()
  age: number;

  constructor(age: number) {
    this.age = age;
  }
}
