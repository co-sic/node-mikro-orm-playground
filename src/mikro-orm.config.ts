import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Book } from "./entities/Book";
import { FlushMode, defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { Author } from "./entities/Author";
import { Publisher } from "./entities/Publisher";

const config = defineConfig({
  debug: true,
  entities: [Author, Book, Publisher],
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
