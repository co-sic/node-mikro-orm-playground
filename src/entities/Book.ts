import {CalendarDate} from "calendar-date";
import {BaseEntity as MikroORMBaseEntity, Entity, PrimaryKey, Property,} from "@mikro-orm/core";
import {CalendarDateType} from "../mikro-orm/CalendarDateType";

@Entity()
export class Book extends MikroORMBaseEntity<Book, 'id'> {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @Property({ type: CalendarDateType })
    releaseDate: CalendarDate

    constructor(releaseDate: CalendarDate) {
        super();
        this.releaseDate = releaseDate;
    }
}
