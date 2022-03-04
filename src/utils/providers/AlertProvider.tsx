import { EvaStatus } from '@ui-kitten/components/devsupport';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { AlertButton, StyleSheet } from 'react-native';
import { Button, CenteredModal, Icon, Text, View } from '../../components/base';
import { alertFnRef } from '../interactions';
import { Spacings } from '../style';
import { MyAlertButton } from '../types';

type AlertState = {
  visible: boolean;
  title?: string;
  message?: string;
  options?: MyAlertButton[];
  cancelTitle?: string;
};

type AlertContextType = {
  state: AlertState;
  setState: Dispatch<SetStateAction<AlertState>>;
};

const defaultContext: AlertContextType = {
  state: { visible: false },
  setState: () => null,
};

const AlertContext = createContext<AlertContextType>(defaultContext);

const getStatusFromStyle = (style?: AlertButton['style']): EvaStatus => {
  switch (style) {
    case 'cancel':
      return 'basic';
    case 'destructive':
      return 'danger';
    case 'default':
    default:
      return 'primary';
  }
};

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AlertState>(defaultContext.state);
  alertFnRef.current = (
    title: string,
    message?: string,
    options?: MyAlertButton[],
    cancelTitle?: string
  ) =>
    setState({
      visible: true,
      title,
      message,
      options,
      cancelTitle,
    });

  const buttons = useMemo(() => {
    const ret = [...(state.options || [])];

    if (!state.options?.some((o) => o.style === 'cancel')) {
      const calculatedCancelText =
        state.cancelTitle || (state.options ? 'Cancel' : 'Ok');
      // cancel wasn't specified, add it to the end.
      ret.push({ text: calculatedCancelText, style: 'cancel' });
    }
    return ret;
  }, [state.cancelTitle, state.options]);

  const handleSelection = useCallback(
    (index?: number) => {
      // close alert
      setState(defaultContext.state);
      // call callback
      if (typeof index === 'number') {
        buttons?.[index].onPress?.();
      }
    },
    [buttons]
  );

  return (
    <AlertContext.Provider value={{ state, setState }}>
      <CenteredModal
        title={state.title}
        visible={state.visible}
        onRequestClose={() => handleSelection()}
      >
        {state.message ? (
          <Text style={styles.message}>{state.message}</Text>
        ) : null}

        <View row right style={styles.buttons}>
          <View>
            {buttons?.map(({ text, style, icon }, i) => {
              return (
                <Button
                  key={i}
                  appearance="ghost"
                  status={getStatusFromStyle(style)}
                  label={text}
                  onPress={() => handleSelection(i)}
                  style={styles.button}
                  accessoryLeft={
                    icon
                      ? (props) => <Icon name={icon} {...props} />
                      : undefined
                  }
                />
              );
            })}
          </View>
        </View>
      </CenteredModal>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

const styles = StyleSheet.create({
  button: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttons: { marginTop: Spacings.s2 },
  message: { marginVertical: Spacings.s1 },
});
