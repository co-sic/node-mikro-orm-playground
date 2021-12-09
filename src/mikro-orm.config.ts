import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
import {Options} from '@mikro-orm/core/utils';
import {Book} from "./entities/Book";

const config: Options = {
  debug: true,
  entities: [
    Book,],
  type: 'postgresql',
  clientUrl: "postgresql://postgres@localhost:5432/node-mikro-orm-playground",
  password: "",
  metadataProvider: TsMorphMetadataProvider,
};
export default config;
