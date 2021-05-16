import 'dotenv/config';
import express, { json } from 'express';
import Queue from './lib/Queue';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

const app = express();
const queues = Queue.queues.map(queue => new BullAdapter(queue.bull));
const BullBoardInstance = createBullBoard(queues);

app.use(json());

app.use('/admin/queues', BullBoardInstance.router);

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  Promise.all([
    Queue.add('UserRegistrationNotify', {
      name,
      email,
    }),
    Queue.add('RegistrationMail', {
      name,
      email,
    }),
  ]);
  res.send(user);
});

app.listen(3000);
