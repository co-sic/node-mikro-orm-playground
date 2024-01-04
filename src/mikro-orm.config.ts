import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Book } from "./entities/Book";
import { FlushMode } from "@mikro-orm/core";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { Author } from "./entities/Author";
import { AuthorWithBook } from "./entities/AuthorWithBook";

const config = defineConfig({
  debug: true,
  entities: [Author, Book, AuthorWithBook],
  clientUrl: "postgresql://postgres@localhost:5432/node-mikro-orm-playground",
  password: "",
  metadataProvider: TsMorphMetadataProvider,
  flushMode: FlushMode.COMMIT,
  migrations: {
    snapshot: false,
  },
  extensions: [Migrator],
});
export default config;
