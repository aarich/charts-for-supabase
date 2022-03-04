export const log = (
  message: string | Error,
  data?: Record<string, unknown>
) => {
  // eslint-disable-next-line no-console
  data ? console.log(message, data) : console.log(message);
};
