import { Input } from '@ui-kitten/components';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Button,
  CenteredModal,
  DropdownPicker,
  PickerOption,
  Text,
  View,
} from '../../components/base';
import { Spacings } from '../../utils';
import { alert, promptFnRef } from '../interactions';

type PromptState = {
  visible: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  callback?: (value: string, cancelled: boolean) => void;
  initialValue?: string;
  okButton?: string;
  maxLength?: number;
  options?: PickerOption<string>[];
};

type PromptContextType = {
  state: PromptState;
  setState: Dispatch<SetStateAction<PromptState>>;
};

const defaultContext: PromptContextType = {
  state: {
    visible: false,
    initialValue: undefined,
    multiline: false,
    placeholder: undefined,
    description: undefined,
    title: undefined,
    okButton: undefined,
    secureTextEntry: false,
    maxLength: undefined,
    options: undefined,
  },
  setState: () => null,
};

const PromptContext = createContext<PromptContextType>(defaultContext);

const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PromptState>(defaultContext.state);
  const [textValue, setTextValue] = useState('');

  const onClosePrompt = useCallback(
    (cancelled: boolean) =>
      state.callback && state.callback(textValue, cancelled),
    [state, textValue]
  );

  useEffect(() => {
    if (state.visible) {
      setTextValue(state.initialValue || state.options?.[0]?.value || '');
    }
  }, [state.initialValue, state.options, state.visible]);

  useEffect(() => {
    promptFnRef.current = (title, description, settings) =>
      new Promise((resolve) => {
        const cb = (value: string, cancelled: boolean) => {
          if (settings?.maxLength && settings.maxLength < value.length) {
            alert(
              `Too long!`,
              `Please remove at least ${
                value.length - settings.maxLength
              } characters`
            );
            return;
          }
          setState(defaultContext.state);
          resolve([value, cancelled]);
        };
        setState({
          visible: true,
          description,
          title,
          callback: cb,
          placeholder: settings?.placeholder,
          multiline: settings?.multiline || false,
          initialValue: settings?.initialValue,
          okButton: settings?.okButton,
          secureTextEntry: settings?.secureTextEntry,
          maxLength: settings?.maxLength,
          options: settings?.options,
        });
      });
  }, []);

  const renderInput = () => {
    if (state.options) {
      return (
        <DropdownPicker
          label=""
          options={state.options}
          selectedValue={textValue}
          onValueChange={setTextValue}
          style={styles.input}
        />
      );
    }

    return (
      <Input
        style={styles.input}
        value={textValue}
        onChangeText={setTextValue}
        placeholder={state.placeholder}
        onSubmitEditing={() => onClosePrompt(false)}
        returnKeyType="go"
        multiline={state.multiline}
        numberOfLines={state.multiline ? 4 : 1}
        secureTextEntry={state.secureTextEntry}
        caption={
          state.maxLength && state.maxLength - textValue.length < 40
            ? textValue.length + '/' + state.maxLength
            : undefined
        }
      />
    );
  };

  return (
    <PromptContext.Provider value={{ state, setState }}>
      <CenteredModal
        title={state.title}
        visible={state.visible}
        onRequestClose={() => onClosePrompt(true)}
        avoidKeyboard
      >
        {state.description ? (
          <Text style={styles.description}>{state.description}</Text>
        ) : null}
        {renderInput()}
        <View row spread>
          <Button
            outline
            status="basic"
            label="Cancel"
            onPress={() => setState({ visible: false })}
          />
          <Button
            label={state.okButton || 'Ok'}
            onPress={() => onClosePrompt(false)}
          />
        </View>
      </CenteredModal>
      {children}
    </PromptContext.Provider>
  );
};

export default PromptProvider;

const styles = StyleSheet.create({
  description: { marginVertical: Spacings.s1 },
  input: {
    marginVertical: Spacings.s2,
    minWidth: 250,
    maxHeight: Dimensions.get('screen').height * 0.4,
  },
});
