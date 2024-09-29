import { APP_SETTINGS } from '../app-settings';
import { ChatOpenAI } from '@langchain/openai';
import { DataSource } from 'typeorm';
import { SqlDatabase } from 'langchain/sql_db';
import { QuerySqlTool } from 'langchain/tools/sql';
import { createSqlQueryChain } from 'langchain/chains/sql_db';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';

const datasource = new DataSource({
  type: 'postgres',
  host: APP_SETTINGS.NODE_HOST,
  password: APP_SETTINGS.DB_PASSWORD,
  username: APP_SETTINGS.DB_USERNAME,
  database: APP_SETTINGS.DB_NAME,
});

class LangchainOpenAi {
  constructor() {
    if (APP_SETTINGS.OPEN_AI_API) {
      this.init();
    }
  }
  private model;
  private chain;

  async init() {
    this.model = new ChatOpenAI({
      model: 'gpt-4',
      temperature: 0,
      openAIApiKey: APP_SETTINGS.OPEN_AI_API,
    });
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
    });
    const executeQuery = new QuerySqlTool(db);
    const writeQuery = await createSqlQueryChain({
      llm: this.model,
      db,
      dialect: 'postgres',
    });
    const answerPrompt =
      PromptTemplate.fromTemplate(`Given the following user question, corresponding SQL query, and SQL result, answer the user question.

Question: {question}
SQL Query: {query}
SQL Result: {result}
Answer: `);

    const answerChain = answerPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser());

    this.chain = RunnableSequence.from([
      RunnablePassthrough.assign({ query: writeQuery }).assign({
        result: (i: { query: string }) => executeQuery.invoke(i.query),
      }),
      answerChain,
    ]);
  }

  async query(qsn: string) {
    if (!this.chain) {
      return;
    }
    return await this.chain.invoke({ question: qsn });
  }
}

export const askDB = new LangchainOpenAi();
