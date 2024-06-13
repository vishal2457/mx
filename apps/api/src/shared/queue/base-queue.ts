import { JobsOptions, Queue, QueueEvents, Worker } from 'bullmq';
import Redis from 'ioredis';
import { queueConnection } from './queue-connection';
import { logger } from '../logger/logger';

export class BaseQueue {
  queue: Queue;
  queueEvents: QueueEvents;
  worker: Worker;

  constructor(name: string, worker: Worker, connection?: Redis) {
    this.queue = new Queue(name, {
      connection: connection || queueConnection,
    });
    this.queueEvents = new QueueEvents(name);
    this.worker = worker;

    worker.on('completed', (job) => {
      logger.info(`Job Completed`, {
        id: job.id,
        queue: job.queueName,
        data: job.data,
      });
    });

    worker.on('failed', (job, err) => {
      logger.error(`Job Failed ${err.stack}`, {
        id: job.id,
        queue: job.queueName,
        data: job.data,
      });
    });
  }

  async add(name, data, options: JobsOptions = {}) {
    const job = await this.queue.add(name, data, options);
    return { job, queueEvents: this.queueEvents };
  }
}
