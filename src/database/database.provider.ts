import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { Player } from '../resource/players/entities/player.entity';

config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, ENV } = process.env;
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Player],
};
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(dataSourceOptions);

      if (!dataSource.isInitialized) {
        return dataSource.initialize().then(async () => {
          if (ENV === 'DEV') await dataSource.synchronize(true);
          await runSeeders(dataSource);
        });
      }
    },
  },
];
