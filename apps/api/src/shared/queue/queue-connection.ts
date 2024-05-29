import IORedis from 'ioredis';

export const queueConnection = new IORedis(6379, 'localhost', {
  maxRetriesPerRequest: null,
});
