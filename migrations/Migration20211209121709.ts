import { Migration } from '@mikro-orm/migrations';

export class Migration20211209121709 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" uuid not null default gen_random_uuid(), "chapter_pages" int4[] not null);');
    this.addSql('alter table "book" add constraint "book_pkey" primary key ("id");');
  }

}
