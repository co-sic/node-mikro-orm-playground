import { Migration } from '@mikro-orm/migrations';

export class Migration20230517155329 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "author" ("id" uuid not null default gen_random_uuid(), constraint "author_pkey" primary key ("id"));');

    this.addSql('create table "localized_string" ("id" uuid not null default gen_random_uuid(), "de_de" varchar(255) not null, "en_us" varchar(255) null, constraint "localized_string_pkey" primary key ("id"));');

    this.addSql('create table "book" ("id" uuid not null default gen_random_uuid(), "title_id" uuid not null, "description_id" uuid null, "author_id" uuid not null, constraint "book_pkey" primary key ("id"));');

    this.addSql('alter table "book" add constraint "book_title_id_foreign" foreign key ("title_id") references "localized_string" ("id") on update cascade;');
    this.addSql('alter table "book" add constraint "book_description_id_foreign" foreign key ("description_id") references "localized_string" ("id") on update cascade on delete set null;');
    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "book" drop constraint "book_author_id_foreign";');

    this.addSql('alter table "book" drop constraint "book_title_id_foreign";');

    this.addSql('alter table "book" drop constraint "book_description_id_foreign";');

    this.addSql('drop table if exists "author" cascade;');

    this.addSql('drop table if exists "localized_string" cascade;');

    this.addSql('drop table if exists "book" cascade;');
  }

}
