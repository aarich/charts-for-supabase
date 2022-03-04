import { EvaStatus } from '@ui-kitten/components/devsupport';
import { AlertButton } from 'react-native';
import { PickerOption } from '../components/base';
import { log } from './log';

type PromptFn = (
  title: string,
  description?: string,
  settings?: {
    placeholder?: string;
    multiline?: boolean;
    initialValue?: string;
    okButton?: string;
    secureTextEntry?: boolean;
    maxLength?: number;
    options?: PickerOption<string>[];
  }
) => Promise<[value: string, cancelled: boolean]>;

type AlertFn = (
  title: string,
  message?: string,
  options?: AlertButton[],
  cancelTitle?: string
) => void;

type ToastFn = (message: string, status?: EvaStatus, timeout?: number) => void;

export const promptFnRef: { current: PromptFn } = {
  current: () => Promise.resolve(['', true]),
};

export const alertFnRef: { current: AlertFn } = { current: () => null };

export const toastFnRef: { current: ToastFn } = { current: () => null };

export const connectionConfigFnRef: {
  current: (opts?: { key?: string; url?: string; email?: string }) => void;
} = {
  current: () => null,
};

/**
 * Send an alert
 *
 * @example alert('Alert!', 'Something went wrong')
 */
export const alert: AlertFn = (title, message, options, cancelTitle) =>
  alertFnRef.current(title, message, options, cancelTitle);

/**
 * Send a prompt
 *
 * @example
 * prompt('Alert!', 'Something went wrong', settings)
 *   .then(([value, cancelled]) => log({value, cancelled}));
 */
export const prompt: PromptFn = (title, description, settings) =>
  promptFnRef.current(title, description, settings);

/**
 * show a toast
 *
 * @default status 'success'
 *
 * @example toast('Successfully deleted', 'info')
 */
export const toast: ToastFn = (message, status, timeout = 3000) =>
  toastFnRef.current(message, status, timeout);

export const showConnectionSettings = (opts?: {
  key?: string;
  url?: string;
  email?: string;
}) => connectionConfigFnRef.current(opts);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMessage = (error: any): error is { message: string } =>
  error && 'message' in error;

export const handleError = (error: unknown) => {
  let message = 'An unknown error happened. Please try again later';

  if (error) {
    if (typeof error === 'string') {
      message = error;
    } else if (typeof error === 'object' && hasMessage(error)) {
      message = error.message;
    }
  }

  log('Error', { error });

  alert('Error', message);
};
