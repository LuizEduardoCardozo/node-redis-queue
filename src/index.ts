import 'dotenv/config';
import express, { json } from 'express';
import Queue from './lib/Queue';

const app = express();

app.use(json());

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
