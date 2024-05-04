import express from 'express';
import cors from 'cors';
import path from 'path';
import errorHandler from './shared/middlewares/error-handler.middleware';
import routerv1 from './routes/v1/router';
import { logHttpRequests } from './shared/logger/morgan-logger';

const app = express();

app.use(logHttpRequests);

app
  .use('/static', express.static(path.join(__dirname, '../src/public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors());

//init all the modules
app.use('/api/v1', routerv1);

//global error handler
// app.use(errorHandler);

export default app;
