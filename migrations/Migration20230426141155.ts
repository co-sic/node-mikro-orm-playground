import { Migration } from '@mikro-orm/migrations';

export class Migration20230426141155 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" uuid not null default gen_random_uuid(), "release_date" date not null, constraint "book_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "book" cascade;');
  }

}
