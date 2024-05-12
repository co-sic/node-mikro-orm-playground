import { Migration } from '@mikro-orm/migrations';

export class Migration20240512090036 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "author" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "embeddable" jsonb not null, constraint "author_pkey" primary key ("id"));');

    this.addSql('create table "book" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "author_id" uuid not null, constraint "book_pkey" primary key ("id"));');

    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "book" drop constraint "book_author_id_foreign";');

    this.addSql('drop table if exists "author" cascade;');

    this.addSql('drop table if exists "book" cascade;');
  }

}
