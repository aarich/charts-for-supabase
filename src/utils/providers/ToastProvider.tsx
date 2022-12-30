import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

import { EvaStatus } from '@ui-kitten/components/devsupport';

import { Toast } from '../../components/base';
import { toastFnRef } from '../interactions';

type ToastState = {
  visible: boolean;
  message: string;
  status: EvaStatus;
};

type ToastContextType = {
  state: ToastState;
  setState: Dispatch<SetStateAction<ToastState>>;
};

const defaultContext: ToastContextType = {
  state: { visible: false, message: '', status: 'success' },
  setState: () => null,
};

const ToastContext = createContext<ToastContextType>(defaultContext);

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ToastState>(defaultContext.state);

  toastFnRef.current = (message, status = 'success', timeout = 3000) => {
    setState({ visible: true, message, status });
    setTimeout(() => {
      setState((old) => ({ ...old, visible: false }));
    }, timeout);
  };

  return (
    <ToastContext.Provider value={{ state, setState }}>
      <Toast
        visible={state.visible}
        message={state.message}
        status={state.status}
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
