/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Queue, { Job } from 'bull';
import redisConf from '../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: redisConf,
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: string, data): Promise<Job<any>> | undefined {
    const queue = this.queues.find(queue => queue.name === name);
    return queue?.bull.add(data);
  },
  process(): any {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log('job failed', queue.name, job.name, err.name);
      });
    });
  },
};
