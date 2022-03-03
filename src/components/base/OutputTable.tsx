import { Divider } from '@ui-kitten/components';
import { ComponentPropsWithoutRef, Fragment } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { getUrlDisplay, Spacings } from '../../utils';
import { a } from './Anchor';
import { Text } from './io';
import Label from './io/Label';
import View from './View';

export type OutputTableData = {
  value?: string | number;
  link?: boolean;
} & ComponentPropsWithoutRef<typeof Label>;

type Props = {
  data: OutputTableData[];
  hideEmptyValues?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default ({ data, hideEmptyValues = true, style }: Props) => {
  const filteredData = hideEmptyValues
    ? data.filter(({ value }) => typeof value !== 'undefined')
    : data;
  return (
    <View style={style}>
      {filteredData.map(({ value = '', link, ...labelProps }, i) => (
        <Fragment key={labelProps.label}>
          <View style={styles.item}>
            <Label {...labelProps} />
            <Text>
              {link && typeof value === 'string'
                ? a(value, getUrlDisplay(value), { showIcon: true })
                : value}
            </Text>
          </View>

          {i !== data.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: { margin: Spacings.s2 },
});
