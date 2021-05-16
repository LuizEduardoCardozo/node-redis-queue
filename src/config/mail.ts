export default {
  host: process.env.MAIL_HOST ?? '',
  port: parseInt(process.env.MAIL_PORT ?? ''),
  auth: {
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
  },
};
