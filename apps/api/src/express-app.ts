import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import routerv1 from './routes/v1/router';
import { logHttpRequests } from './shared/logger/morgan-logger';
import errorHandler from './shared/middlewares/error-handler.middleware';

const app = express();

app
  .use('/static', express.static(path.join(__dirname, '../src/assets')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())
  .use(logHttpRequests);

//init all the modules
app.use('/api/v1', routerv1);

//global error handler
app.use(errorHandler);

export default app;
