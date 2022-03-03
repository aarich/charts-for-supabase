import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  QueryReturnCount,
  QueryReturnInfo,
  QueryReturnLinear,
  QueryReturnType,
  Spacings,
} from '../../utils';
import { DropdownPicker, RadioGroupPicker, TextField, View } from '../base';

type Props = {
  draft: QueryReturnInfo;
  onUpdate: (updates: QueryReturnInfo) => void;
};

const EditReturnType = ({ onUpdate, draft }: Props) => {
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
      scale = 'linear',
      count = 'exact',
    } = cachedInfo;

    if (draft.type === QueryReturnType.LINEAR) {
      setCachedInfo({
        ...cachedInfo,
        xColumn: draft.xColumn,
        yColumn: draft.yColumn,
        scale: draft.scale,
      });
    } else if (draft.type === QueryReturnType.COUNT) {
      setCachedInfo({ ...cachedInfo, count: draft.count });
    }

    switch (newType) {
      case QueryReturnType.COUNT:
        onUpdate({ type: newType, count });
        break;
      case QueryReturnType.LINEAR:
        onUpdate({ type: newType, xColumn, yColumn, scale });
        break;
    }
  };

  const renderReturnTypeInfo = () => {
    switch (draft.type) {
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
            <TextField
              label="X Column"
              value={draft.xColumn}
              onChangeText={(xColumn) => onUpdate({ ...draft, xColumn })}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.item}
            />
            <TextField
              label="Y Column"
              value={draft.yColumn}
              onChangeText={(yColumn) => onUpdate({ ...draft, yColumn })}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.item}
            />
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
