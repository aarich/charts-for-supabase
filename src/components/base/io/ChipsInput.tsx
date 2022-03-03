import {
  Autocomplete,
  AutocompleteItem,
  Input,
  InputProps,
} from '@ui-kitten/components';
import {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Icons, Spacings } from '../../../utils';
import View from '../View';
import Button from './Button';
import Label from './Label';
import Text from './Text';

type Props<T extends string> = {
  label: string;
  tooltip?: string;
  allowedValues?: T[];
  values?: T[];
  onValidateValue: (value: string) => value is T;
  onChangeValues: (value: T[]) => void;
  style?: StyleProp<ViewStyle>;
} & Omit<
  InputProps,
  'value' | 'onChangeText' | 'onSubmitEditing' | 'returnKeyType' | 'status'
>;

export type ChipsInputRef = {
  focus: VoidFunction;
};

const ChipsInput = forwardRef(
  <T extends string>(
    {
      label,
      tooltip,
      allowedValues,
      values = [],
      onValidateValue,
      onChangeValues,
      style,
      ...restInputProps
    }: Props<T>,
    ref?: Ref<ChipsInputRef>
  ) => {
    const [text, setText] = useState('');
    const [filteredValues, setFilteredValues] = useState(allowedValues);
    const [error, setError] = useState('');

    const handleChangeText = (newText: string) => {
      setError('');
      setText(newText);
    };

    useEffect(() => {
      if (allowedValues) {
        setFilteredValues(
          allowedValues.filter(
            (v) =>
              v.toLowerCase().includes(text.toLowerCase()) &&
              !values?.includes(v)
          )
        );
      }
    }, [allowedValues, text, values]);

    const handleSubmit = (v: string) => {
      if (onValidateValue(v)) {
        if (values.includes(v)) {
          setError('Already used');
        } else {
          onChangeValues([...values, v]);
        }
      } else {
        setError('Invalid value');
      }
    };

    const onRemoveValue = (v: T) =>
      onChangeValues(values.filter((val) => val !== v));

    const inputProps: InputProps = {
      value: text,
      onChangeText: handleChangeText,
      onSubmitEditing: () => handleSubmit(text),
      status: error ? 'danger' : undefined,
      style: { minWidth: 100 },
      ...restInputProps,
    };

    const inputRef = useRef<Autocomplete>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <View style={style}>
        <Label label={label} tooltip={tooltip} />

        <View row style={styles.view}>
          {values.map((v) => (
            <View center key={v}>
              <Button
                label={v}
                status="basic"
                size="tiny"
                icon={{ name: Icons.close, onRight: true }}
                onPress={() => onRemoveValue(v)}
                style={styles.chip}
              />
            </View>
          ))}
          <View style={styles.inputContainer}>
            {allowedValues && filteredValues ? (
              <Autocomplete
                ref={inputRef}
                onSelect={(index) => handleSubmit(filteredValues[index])}
                {...inputProps}
              >
                {filteredValues?.map((v) => (
                  <AutocompleteItem key={v} title={v} />
                ))}
              </Autocomplete>
            ) : (
              <Input {...inputProps} />
            )}
            {error ? <Text status="danger">{error}</Text> : null}
          </View>
        </View>
      </View>
    );
  }
) as <T extends string>(
  p: Props<T> & { ref?: Ref<ChipsInputRef> }
) => ReactElement;

export default ChipsInput;

const styles = StyleSheet.create({
  view: { flexWrap: 'wrap' },
  chip: {
    marginHorizontal: Spacings.s2,
    borderRadius: 20,
    marginVertical: Spacings.s1,
  },
  inputContainer: { flexGrow: 1 },
});
