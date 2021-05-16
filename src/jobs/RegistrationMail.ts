/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mailer from '../lib/Mailer';

export default {
  key: 'RegistrationMail',
  async handle(data): Promise<void> {
    const { name, email } = data.data;
    console.log(
      `[RegistrationMail] enviando o email de boas vindas para ${email}`,
    );
    await mailer.sendMail({
      from: 'Queue tester - queuetester@e2soft.com',
      to: `${name} <${email}>`,
      subject: 'Queue test',
      html: `
    Olá ${name}, seja bem vindo ao sistema!</br>
    Esse email foi enviado automaticamente 
    através de um serviço de envio de email 
    em filas`,
    });
    console.log(
      `[RegistrationMail] enviado o email de boas vindas para ${email}`,
    );
  },
};
