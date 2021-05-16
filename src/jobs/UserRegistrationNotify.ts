/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  key: 'UserRegistrationNotify',
  handle(data): void {
    const { name, email } = data.data;
    console.log(`[UserRegistrationNotify] ${name} - ${email} | ${Date.now()}`);
  },
};
