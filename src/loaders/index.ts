import expressLoader from './express';
import dependencyInjectorLoder from './dependency-injector';
import databaseLoader from './database';
import Logger from './logger';
import { User } from '@src/entities/user.entity';

export default async ({ expressApp }) => {
  const runMode = process.env.NODE_ENV;
  Logger.info(`✅ Server is running on [${runMode.toUpperCase()}] mode.`);

  const connection = await databaseLoader.create();
  Logger.info('✅ DB loaded and connected!');

  await dependencyInjectorLoder({
    repositories: [User].map(e => ({
      name: e.name.charAt(0).toLowerCase() + e.name.slice(1) + 'Repository',
      repository: connection.manager.getRepository(e),
    })),
  });
  Logger.info('✅ Dependency Injector loaded.');

  await expressLoader({ app: expressApp });
  Logger.info('✅ Express loaded.');
};
