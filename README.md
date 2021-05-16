# NodeJS - sending email with queues

This is simple POC to a process of sending a email when a new user is registered in system, using a queue.

The system was built in 2 microservices

- a microservice to handle the user registratio
- a microservice to send the "welcome mail".

There is also a Redis instance, which is used to store all events in the queue.

## How to Setup

You need docker and docker-compoose installed on your machine.

```sh
docker-compose up
```

## How to Test

First, you need to setup the .env file, based in .example.env. You can keep the Redis configuration , if you use with docker-compose.

The MAIL\_\* fields are for the smtp server. You can use a "fake smtp server", like [mailtrap](https://mailtrap.io/), or [mailspons](https://mailspons.com/).

After, you can make a post to /users route, and create a new user.

```sh
curl localhost:3000/users --header "Content-Type: application/json" \
--request POST \
--data '{"name":"Eduardo Cardozo","email":"eduard.mail@mail.com","password":"mypass"}'
```

In docker compose terminal, you will see the 3 loggin messages

```s
queue_1  | [UserRegistrationNotify] <name> - <email> | <now time>
queue_1  | [RegistrationMail] enviando o email de boas vindas para <email>
queue_1  | [RegistrationMail] enviado o email de boas vindas para <email>
```

Check the fake smtp server to check if the email was delivered.

## Monitoring

There is a panel to analyze the queue execution

```
localhost:3000/admin/queues
```

## Used Technologies

- NodeJs
- TypeScript
- Express
- NodeMailer
- Redis
- Bull
- Bull-Board
- Docker
