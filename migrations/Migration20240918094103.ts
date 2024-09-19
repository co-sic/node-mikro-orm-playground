import { Migration } from '@mikro-orm/migrations';

export class Migration20240918094103 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "author" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, constraint "author_pkey" primary key ("id"));`);

    this.addSql(`create table "book" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "author_id" uuid not null, constraint "book_pkey" primary key ("id"));`);

    this.addSql(`create table "publisher" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "owner_id" uuid not null, constraint "publisher_pkey" primary key ("id"));`);
    this.addSql(`alter table "publisher" add constraint "publisher_owner_id_unique" unique ("owner_id");`);

    this.addSql(`alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;`);

    this.addSql(`alter table "publisher" add constraint "publisher_owner_id_foreign" foreign key ("owner_id") references "author" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "book" drop constraint "book_author_id_foreign";`);

    this.addSql(`alter table "publisher" drop constraint "publisher_owner_id_foreign";`);

    this.addSql(`drop table if exists "author" cascade;`);

    this.addSql(`drop table if exists "book" cascade;`);

    this.addSql(`drop table if exists "publisher" cascade;`);
  }

}
