import { Migration } from '@mikro-orm/migrations';

export class Migration20240522142235 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "publisher" cascade;');

    this.addSql('alter table "author" drop column "embeddable_age";');
  }

  async down(): Promise<void> {
    this.addSql('create table "publisher" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "owner_id" uuid not null, constraint "publisher_pkey" primary key ("id"));');
    this.addSql('alter table "publisher" add constraint "publisher_owner_id_unique" unique ("owner_id");');

    this.addSql('alter table "publisher" add constraint "publisher_owner_id_foreign" foreign key ("owner_id") references "author" ("id") on update cascade on delete no action;');

    this.addSql('alter table "author" add column "embeddable_age" int4 not null;');
  }

}
