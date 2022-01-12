import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

import { getConnectionOptionByName } from '@src/config/ormconfig';
import Logger from './logger';

const dbConnection = {
  async create() {
    let name: 'default' | 'test' = 'default';
    if (process.env.NODE_ENV === 'test') {
      name = process.env.NODE_ENV;
      Logger.info('[DB] TEST_DB');
    }

    const connectionOption = getConnectionOptionByName(name);
    const connection = await createConnection(connectionOption);

    return connection;
  },
  async close() {
    const connection = getConnection();
    if (connection.isConnected) {
      connection.close();
    }
  },
  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

export default dbConnection;
