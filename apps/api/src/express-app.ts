import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import routerv1 from './routes/v1/router';
import { logHttpRequests } from './shared/logger/morgan-logger';
import errorHandler from './shared/middlewares/error-handler.middleware';
import { serverAdapter } from './shared/queue/queue-board';
import helmet from 'helmet';
import responseTime from 'response-time';
import promClient from 'prom-client';

// Use default collection metric and register it with promethus client
const collectDefcollectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefcollectDefaultMetrics({
  register: promClient.register,
});

const reqResTime = new promClient.Histogram({
  name: 'http_express_req_res_time',
  help: 'This tells how much time is taken by request and response',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCounter = new promClient.Counter({
  name: 'total_req',
  help: 'Total requests',
});

const app = express();

app
  .use(cors())
  .use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  )
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    helmet.frameguard({
      action: 'deny',
    }),
  )
  .use('/static', express.static(path.join(process.cwd() + '/mx-images/')))
  .use(logHttpRequests)
  .use(
    responseTime((req, res, time) => {
      totalReqCounter.inc();
      reqResTime
        .labels({
          method: req.method,
          route: req.url,
          status_code: res.statusCode,
        })
        .observe(time);
    }),
  );

//init all the modules
app.use('/api/v1', routerv1);

//init queue routes
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.send(metrics);
});

//global error handler
app.use(errorHandler);

export default app;
