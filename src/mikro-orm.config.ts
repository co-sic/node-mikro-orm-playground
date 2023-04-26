import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
import {Options} from '@mikro-orm/core/utils';
import {Book} from "./entities/Book";
import {FlushMode} from "@mikro-orm/core";

const config: Options = {
  debug: true,
  entities: [
    Book,],
  type: 'postgresql',
  clientUrl: "postgresql://postgres@localhost:5435/node-mikro-orm-playground",
  password: "",
  metadataProvider: TsMorphMetadataProvider,
  flushMode: FlushMode.COMMIT,
  migrations: {
    snapshot: false,
  }
};
export default config;
