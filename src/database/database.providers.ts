import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'dfo.h.filess.io',
        port: 3307,
        username: 'testBackendAtelier_handdutyno',
        password: '318368910516c42108fb24948c3898d877bfaca3',
        database: 'testBackendAtelier_handdutyno',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];