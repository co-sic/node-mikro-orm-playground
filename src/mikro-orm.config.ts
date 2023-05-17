import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Options } from "@mikro-orm/core/utils";
import { Book } from "./entities/Book";
import { FlushMode } from "@mikro-orm/core";
import { LocalizedString } from "./entities/LocalizedString";

const config: Options = {
  debug: true,
  entities: [Book, LocalizedString],
  type: "postgresql",
  clientUrl: "postgresql://postgres@localhost:5432/node-mikro-orm-playground",
  password: "",
  metadataProvider: TsMorphMetadataProvider,
  flushMode: FlushMode.COMMIT,
  migrations: {
    snapshot: false,
  },
};
export default config;
