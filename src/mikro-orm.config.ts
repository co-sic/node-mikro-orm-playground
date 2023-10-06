import { FlushMode } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { defineConfig } from "@mikro-orm/postgresql";

const entitiesPath =
  process.env.NODE_ENV === "development"
    ? "./src/entities"
    : "./dist/src/entities";

export const config = defineConfig({
  debug: process.env.NODE_ENV === "development",
  entities: [entitiesPath],
  clientUrl: "postgresql://postgres@localhost:5432/node-mikro-orm-playground",
  password: "",
  metadataProvider: TsMorphMetadataProvider,
  flushMode: FlushMode.COMMIT,
  migrations: {
    snapshot: false,
  },
});
export default config;
