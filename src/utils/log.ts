export const log = (
  message: string | Error,
  data?: Record<string, unknown>
) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    data ? console.log(message, data) : console.log(message);
  }
};
