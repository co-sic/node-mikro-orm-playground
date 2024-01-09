import { Migration } from '@mikro-orm/migrations';

export class Migration20240109115038 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "publisher" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "owner_id" uuid not null, constraint "publisher_pkey" primary key ("id"));');
    this.addSql('alter table "publisher" add constraint "publisher_owner_id_unique" unique ("owner_id");');

    this.addSql('alter table "publisher" add constraint "publisher_owner_id_foreign" foreign key ("owner_id") references "author" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "publisher" cascade;');
  }

}
