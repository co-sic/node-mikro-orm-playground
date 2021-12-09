import {BaseEntity as MikroORMBaseEntity, Entity, PrimaryKey, Property,} from "@mikro-orm/core";
import {IntegerArrayType} from "../mikro-orm/IntegerArrayType";

@Entity()
export class Book extends MikroORMBaseEntity<Book, 'id'> {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @Property({ type: new IntegerArrayType() })
    chapterPages: number[];

    /** This one works */
    // @Property({ customType: new IntegerArrayType() })
    // chapterPages: number[];

    constructor(chapterPages: number[]) {
        super();
        this.chapterPages = chapterPages;
    }
}
