import { APP_SETTINGS } from '../app-settings';
import { ChatOpenAI } from '@langchain/openai';
import { DataSource } from 'typeorm';
import { SqlDatabase } from 'langchain/sql_db';

const datasource = new DataSource({
  type: 'postgres',
  database: `postgresql://${APP_SETTINGS.DB_USERNAME}:${APP_SETTINGS.DB_PASSWORD}@${APP_SETTINGS.NODE_HOST}:${APP_SETTINGS.DB_PORT}/fitflow`,
});

const getDB = async () => {
  return await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
};

class LangchainOpenAi {}
