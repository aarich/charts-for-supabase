import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@ui-kitten/components';

import { DEFAULT_TABLE_LIMIT } from '../../api/database/SupabaseConnection';
import {
    ModifierType, QueryInfo, QueryReturnCount, QueryReturnInfo, QueryReturnLinear, QueryReturnType,
    Spacings
} from '../../utils';
import { useColumns } from '../../utils/hooks';
import { DropdownPicker, RadioGroupPicker, TextField, toOptions, View } from '../base';

type Props = {
  queryInfo: QueryInfo;
  table: string | undefined;
  draft: QueryReturnInfo;
  onUpdate: (updates: QueryReturnInfo) => void;
};

const EditReturnType = ({ onUpdate, draft, table, queryInfo }: Props) => {
  const columns = useColumns(table);

  const [cachedInfo, setCachedInfo] = useState<{
    xColumn?: string;
    yColumn?: string;
    count?: QueryReturnCount['count'];
    scale?: QueryReturnLinear['scale'];
  }>({});

  const handleQueryReturnTypeChange = (newType: QueryReturnType) => {
    if (newType === draft.type) {
      return;
    }

    const {
      yColumn = '',
      xColumn = '',
      scale = 'time',
      count = 'exact',
    } = cachedInfo;

    switch (draft.type) {
      case QueryReturnType.LINEAR:
        setCachedInfo({
          ...cachedInfo,
          xColumn: draft.xColumn,
          yColumn: draft.yColumn,
          scale: draft.scale,
        });
        break;
      case QueryReturnType.COUNT:
        setCachedInfo({ ...cachedInfo, count: draft.count });
        break;
    }

    switch (newType) {
      case QueryReturnType.COUNT:
        onUpdate({ type: newType, count });
        break;
      case QueryReturnType.LINEAR:
        onUpdate({ type: newType, xColumn, yColumn, scale });
        break;
      case QueryReturnType.TABLE:
        onUpdate({ type: newType });
        break;
    }
  };

  useEffect(() => {
    if (columns && draft.type === QueryReturnType.LINEAR) {
      let { xColumn, yColumn } = draft;
      if (!columns.includes(xColumn)) {
        xColumn = columns[0];
      }
      if (!columns.includes(yColumn)) {
        yColumn = columns[0];
      }
      if (xColumn === draft.xColumn && yColumn === draft.yColumn) {
        return;
      }
      onUpdate({ ...draft, xColumn, yColumn });
    }
  }, [columns, draft, onUpdate]);

  const renderReturnTypeInfo = (): ReactElement => {
    switch (draft.type) {
      case QueryReturnType.TABLE:
        return (
          <View row center style={styles.item}>
            {queryInfo.modifiers?.find(
              (modifier) => modifier.type === ModifierType.LIMIT
            ) ? null : (
              <Text category="c2">
                FYI: With no limit modifer, the default limit for a table is{' '}
                {DEFAULT_TABLE_LIMIT}
              </Text>
            )}
          </View>
        );
      case QueryReturnType.COUNT:
        return (
          <View row>
            <RadioGroupPicker
              style={styles.item}
              label="Count Type"
              options={[
                { label: 'Exact', value: 'exact' },
                { label: 'Estimated', value: 'estimated' },
                { label: 'Planned', value: 'planned' },
              ]}
              onValueChange={(count) => onUpdate({ ...draft, count })}
              selectedValue={draft.count}
              vertical
            />
          </View>
        );
      case QueryReturnType.LINEAR:
        return (
          <>
            {columns ? (
              <>
                <DropdownPicker
                  label="Independent Column"
                  selectedValue={draft.xColumn}
                  onValueChange={(xColumn) => onUpdate({ ...draft, xColumn })}
                  options={toOptions(columns)}
                  style={styles.item}
                />
                <DropdownPicker
                  label="Dependent Column"
                  selectedValue={draft.yColumn}
                  onValueChange={(yColumn) => onUpdate({ ...draft, yColumn })}
                  options={toOptions(columns)}
                  style={styles.item}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Independent Column"
                  value={draft.xColumn}
                  onChangeText={(xColumn) => onUpdate({ ...draft, xColumn })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.item}
                />
                <TextField
                  label="Dependent Column"
                  value={draft.yColumn}
                  onChangeText={(yColumn) => onUpdate({ ...draft, yColumn })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.item}
                />
              </>
            )}
            <RadioGroupPicker
              style={styles.item}
              label="X Axis Scale"
              options={[
                { label: 'Time', value: 'time' },
                { label: 'Linear', value: 'linear' },
              ]}
              onValueChange={(scale) => onUpdate({ ...draft, scale })}
              selectedValue={draft.scale}
            />
          </>
        );
    }
  };

  return (
    <>
      <DropdownPicker
        label="Query Return Type"
        options={[
          { label: 'Count', value: QueryReturnType.COUNT },
          { label: 'Linear', value: QueryReturnType.LINEAR },
          { label: 'Table', value: QueryReturnType.TABLE },
        ]}
        selectedValue={draft.type}
        onValueChange={handleQueryReturnTypeChange}
        style={styles.item}
      />
      {renderReturnTypeInfo()}
    </>
  );
};

export default EditReturnType;

const styles = StyleSheet.create({ item: { marginTop: Spacings.s2 } });
